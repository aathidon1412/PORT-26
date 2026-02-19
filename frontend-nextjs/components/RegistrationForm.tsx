'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface RegistrationFormProps {
  workshopId: string;
  workshopName: string;
  onSuccess?: () => void;
  onClose?: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  contactNumber: string;
  gender: string;
  transactionId: string;
  paymentScreenshot: string; // base64 data-URL
  collegeName: string;
  department: string;
  yearOfStudy: string;
  collegeRegisterNumber: string;
  city: string;
}

interface FormErrors {
  [key: string]: string;
}

// Map workshop IDs to API endpoints
const workshopIdToEndpoint: Record<string, string> = {
  'ws-1': 'hackproofing',
  'ws-2': 'prompt-to-product',
  'ws-3': 'full-stack-fusion',
  'ws-4': 'learn-how-to-think',
  'port-pass': 'port-pass',
};

const EMPTY_FORM: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  confirmEmail: '',
  contactNumber: '',
  gender: '',
  transactionId: '',
  paymentScreenshot: '',
  collegeName: '',
  department: '',
  yearOfStudy: '',
  collegeRegisterNumber: '',
  city: '',
};

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  workshopId,
  workshopName,
  onSuccess,
  onClose,
}) => {
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [screenshotPreview, setScreenshotPreview] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Validation ────────────────────────────────────────────────────────────
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required';
    if (!formData.lastName.trim())  newErrors.lastName  = 'Last Name is required';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim())              newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Please enter a valid email';

    if (formData.confirmEmail !== formData.email) newErrors.confirmEmail = 'Emails do not match';

    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.contactNumber.trim())
      newErrors.contactNumber = 'Contact Number is required';
    else if (!phoneRegex.test(formData.contactNumber.replace(/\D/g, '')))
      newErrors.contactNumber = 'Please enter a valid 10-digit phone number';

    if (!formData.gender) newErrors.gender = 'Gender is required';

    // Transaction ID
    if (!formData.transactionId.trim())
      newErrors.transactionId = 'Transaction ID is required';

    if (!formData.paymentScreenshot)
      newErrors.paymentScreenshot = 'Payment screenshot is required';

    if (!formData.collegeName.trim())           newErrors.collegeName           = 'College Name is required';
    if (!formData.department.trim())            newErrors.department            = 'Department is required';
    if (!formData.yearOfStudy)                  newErrors.yearOfStudy           = 'Year of Study is required';
    if (!formData.collegeRegisterNumber.trim()) newErrors.collegeRegisterNumber = 'College Register Number is required';
    if (!formData.city.trim())                  newErrors.city                  = 'City is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ── Duplicate check ───────────────────────────────────────────────────────
  const checkDuplicateRegistration = async (
    email: string,
    phone: string
  ): Promise<boolean> => {
    try {
      const apiEndpoint = workshopIdToEndpoint[workshopId] || workshopId;
      const endpoint =
        workshopId === 'port-pass'
          ? '/api/port-pass'
          : `/api/workshops/${apiEndpoint}`;

      const res = await fetch(`${endpoint}?email=${email}&phone=${phone}`);
      if (!res.ok) return true;

      const contentType = res.headers.get('content-type');
      if (!contentType?.includes('application/json')) return true;

      const data = await res.json();
      if (data.isDuplicate) {
        const fieldName = data.field === 'email' ? 'email address' : 'phone number';
        toast.error(data.message || `This ${fieldName} is already registered.`);
        return false;
      }
      return true;
    } catch {
      return true;
    }
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const toastId = toast.loading('Processing your registration...');
    setLoading(true);

    try {
      const noDuplicate = await checkDuplicateRegistration(
        formData.email,
        formData.contactNumber.replace(/\D/g, '')
      );
      if (!noDuplicate) { setLoading(false); return; }

      const apiEndpoint = workshopIdToEndpoint[workshopId] || workshopId;
      const endpoint =
        workshopId === 'port-pass'
          ? '/api/port-pass'
          : `/api/workshops/${apiEndpoint}`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName:             formData.firstName,
          lastName:              formData.lastName,
          email:                 formData.email,
          contactNumber:         formData.contactNumber.replace(/\D/g, ''),
          gender:                formData.gender,
          paymentMode:           'UPI',
          transactionId:         formData.transactionId.trim(),
          paymentScreenshot:     formData.paymentScreenshot,
          collegeName:           formData.collegeName,
          department:            formData.department,
          yearOfStudy:           formData.yearOfStudy,
          collegeRegisterNumber: formData.collegeRegisterNumber,
          city:                  formData.city,
        }),
      });

      const contentType = response.headers.get('content-type');
      if (!contentType?.includes('application/json'))
        throw new Error(`Invalid response type: ${contentType}`);

      const data = await response.json();

      if (response.ok) {
        toast.success(`Successfully registered for ${workshopName}!`, { id: toastId, duration: 4000 });
        setFormData(EMPTY_FORM);
        setScreenshotPreview('');
        setTimeout(() => { onSuccess?.(); }, 2000);
      } else {
        // Handle specific error messages from backend
        let errorMessage = 'Registration failed. Please try again.';
        
        if (data.message) {
          const msg = data.message.toLowerCase();
          if (msg.includes('email') && msg.includes('already')) {
            errorMessage = 'This email is already registered.';
          } else if (msg.includes('contact') || msg.includes('phone')) {
            errorMessage = 'This phone number is already registered.';
          } else if (msg.includes('transaction')) {
            errorMessage = 'This transaction ID has already been used.';
          } else if (msg.includes('workshop')) {
            errorMessage = 'You can only register for one workshop.';
          } else {
            errorMessage = data.message;
          }
        }
        
        toast.error(errorMessage, { id: toastId });
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('An error occurred. Please try again.', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  // ── Input handlers ────────────────────────────────────────────────────────
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrors((prev) => ({ ...prev, paymentScreenshot: 'Please upload an image file' }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, paymentScreenshot: 'Image must be smaller than 5 MB' }));
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setFormData((prev) => ({ ...prev, paymentScreenshot: dataUrl }));
      setScreenshotPreview(dataUrl);
      setErrors((prev) => ({ ...prev, paymentScreenshot: '' }));
    };
    reader.readAsDataURL(file);
  };

  // ── Shared input className ────────────────────────────────────────────────
  const inputCls = (field: string) =>
    `w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600 dark:bg-slate-800 dark:border-slate-700 dark:text-white ${
      errors[field] ? 'border-red-500' : ''
    }`;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Header */}
      <div className="bg-linear-to-r from-violet-600 to-indigo-600 px-6 py-6 text-white rounded-t-2xl">
        <h2 className="text-2xl font-bold">{workshopName}</h2>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-b-2xl shadow-xl">
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Row 1: First Name & Last Name */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">
                First Name <span className="text-red-500">*</span>
              </label>
              <input type="text" name="firstName" value={formData.firstName}
                onChange={handleInputChange} className={inputCls('firstName')} placeholder="John" />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input type="text" name="lastName" value={formData.lastName}
                onChange={handleInputChange} className={inputCls('lastName')} placeholder="Doe" />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>
          </div>

          {/* Row 2: Email & Confirm Email */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">
                Email <span className="text-red-500">*</span>
              </label>
              <input type="email" name="email" value={formData.email}
                onChange={handleInputChange} className={inputCls('email')} placeholder="john@example.com" />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">
                Confirm Email <span className="text-red-500">*</span>
              </label>
              <input type="email" name="confirmEmail" value={formData.confirmEmail}
                onChange={handleInputChange} className={inputCls('confirmEmail')} placeholder="john@example.com" />
              {errors.confirmEmail && <p className="text-red-500 text-sm mt-1">{errors.confirmEmail}</p>}
            </div>
          </div>

          {/* Row 3: Contact Number & Gender */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">
                Contact Number <span className="text-red-500">*</span>
              </label>
              <input type="tel" name="contactNumber" value={formData.contactNumber}
                onChange={handleInputChange} className={inputCls('contactNumber')} placeholder="9876543210" />
              {errors.contactNumber && <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">
                Gender <span className="text-red-500">*</span>
              </label>
              <select name="gender" value={formData.gender}
                onChange={handleInputChange} className={inputCls('gender')}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
              {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
            </div>
          </div>

          {/* Row 4: UPI Payment (UPI only) */}
          <div className="rounded-xl border border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-violet-950/30 p-4 space-y-4">
            <p className="text-sm font-semibold text-violet-700 dark:text-violet-300 flex items-center gap-2">
              <span>💳</span> Payment — UPI Only
            </p>

            {/* Transaction ID */}
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">
                Transaction ID <span className="text-red-500">*</span>
              </label>
              <input type="text" name="transactionId" value={formData.transactionId}
                onChange={handleInputChange} className={inputCls('transactionId')}
                placeholder="e.g. TXN123456789" autoComplete="off" />
              {errors.transactionId && <p className="text-red-500 text-sm mt-1">{errors.transactionId}</p>}
            </div>

            {/* Payment Screenshot */}
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">
                Payment Screenshot <span className="text-red-500">*</span>
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`cursor-pointer flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-lg py-6 transition
                  ${errors.paymentScreenshot ? 'border-red-500' : 'border-violet-300 dark:border-violet-700'}
                  hover:border-violet-500 dark:hover:border-violet-400
                  bg-white dark:bg-slate-800`}
              >
                {screenshotPreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={screenshotPreview} alt="Payment screenshot preview"
                    className="max-h-40 rounded-lg object-contain" />
                ) : (
                  <>
                    <span className="text-3xl">📎</span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      Click to upload payment screenshot
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-500">
                      PNG, JPG, WEBP — max 5 MB
                    </span>
                  </>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              {errors.paymentScreenshot && (
                <p className="text-red-500 text-sm mt-1">{errors.paymentScreenshot}</p>
              )}
              {screenshotPreview && (
                <button
                  type="button"
                  onClick={() => {
                    setScreenshotPreview('');
                    setFormData((prev) => ({ ...prev, paymentScreenshot: '' }));
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  className="mt-1 text-xs text-red-500 hover:text-red-700"
                >
                  Remove screenshot
                </button>
              )}
            </div>
          </div>

          {/* Row 5: College Name & Department */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">
                College Name <span className="text-red-500">*</span>
              </label>
              <input type="text" name="collegeName" value={formData.collegeName}
                onChange={handleInputChange} className={inputCls('collegeName')} placeholder="College Name" />
              {errors.collegeName && <p className="text-red-500 text-sm mt-1">{errors.collegeName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">
                Department <span className="text-red-500">*</span>
              </label>
              <input type="text" name="department" value={formData.department}
                onChange={handleInputChange} className={inputCls('department')} placeholder="Computer Science" />
              {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
            </div>
          </div>

          {/* Row 6: Year of Study & Register Number */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">
                Year of Study <span className="text-red-500">*</span>
              </label>
              <select name="yearOfStudy" value={formData.yearOfStudy}
                onChange={handleInputChange} className={inputCls('yearOfStudy')}>
                <option value="">Select Year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
              {errors.yearOfStudy && <p className="text-red-500 text-sm mt-1">{errors.yearOfStudy}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">
                College Register Number <span className="text-red-500">*</span>
              </label>
              <input type="text" name="collegeRegisterNumber" value={formData.collegeRegisterNumber}
                onChange={handleInputChange} className={inputCls('collegeRegisterNumber')} placeholder="Register No." />
              {errors.collegeRegisterNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.collegeRegisterNumber}</p>
              )}
            </div>
          </div>

          {/* Row 7: City */}
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-white">
              City <span className="text-red-500">*</span>
            </label>
            <input type="text" name="city" value={formData.city}
              onChange={handleInputChange} className={inputCls('city')} placeholder="Your City" />
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-linear-to-r from-violet-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:from-violet-700 hover:to-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Registering...' : 'Register Now'}
            </button>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-300 dark:bg-slate-700 text-gray-800 dark:text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-400 dark:hover:bg-slate-600 transition"
              >
                Back
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
