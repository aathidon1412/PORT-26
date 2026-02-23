'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import { CreditCard, Paperclip } from 'lucide-react';

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
  paymentScreenshot: string;
  collegeName: string;
  department: string;
  yearOfStudy: string;
  collegeRegisterNumber: string;
  city: string;
}

interface FormErrors {
  [key: string]: string;
}

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
    if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (formData.confirmEmail !== formData.email) newErrors.confirmEmail = 'Emails do not match';

    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.contactNumber.trim())
      newErrors.contactNumber = 'Contact Number is required';
    else if (!phoneRegex.test(formData.contactNumber.replace(/\D/g, '')))
      newErrors.contactNumber = 'Please enter a valid 10-digit phone number';

    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.transactionId.trim()) newErrors.transactionId = 'Transaction ID is required';
    if (!formData.paymentScreenshot) newErrors.paymentScreenshot = 'Payment screenshot is required';
    if (!formData.collegeName.trim()) newErrors.collegeName = 'College Name is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.yearOfStudy) newErrors.yearOfStudy = 'Year of Study is required';
    if (!formData.collegeRegisterNumber.trim())
      newErrors.collegeRegisterNumber = 'College Register Number is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';

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
        toast.error(data.message || `This ${data.field} is already registered for this event.`);
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
      if (!noDuplicate) { toast.dismiss(toastId); setLoading(false); return; }

      const apiEndpoint = workshopIdToEndpoint[workshopId] || workshopId;
      const endpoint =
        workshopId === 'port-pass'
          ? '/api/port-pass'
          : `/api/workshops/${apiEndpoint}`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          contactNumber: formData.contactNumber.replace(/\D/g, ''),
          gender: formData.gender,
          paymentMode: 'UPI',
          transactionId: formData.transactionId.trim(),
          paymentScreenshot: formData.paymentScreenshot,
          collegeName: formData.collegeName,
          department: formData.department,
          yearOfStudy: formData.yearOfStudy,
          collegeRegisterNumber: formData.collegeRegisterNumber,
          city: formData.city,
        }),
      });

      const contentType = response.headers.get('content-type');
      if (!contentType?.includes('application/json'))
        throw new Error(`Invalid response type: ${contentType}`);

      const data = await response.json();

      if (response.ok) {
        toast.dismiss(toastId);

        toast.custom(
          (t) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: -50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className={`${t.visible ? 'animate-enter' : 'animate-leave'
                } max-w-sm w-full bg-slate-900 shadow-2xl rounded-2xl pointer-events-auto border border-violet-800 p-8 text-center relative overflow-hidden mt-[25vh]`}
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-violet-600 to-indigo-600" />
              <div className="mx-auto flex flex-col items-center justify-center h-20 w-20 rounded-full bg-violet-900/30 mb-6 text-4xl shadow-inner border border-violet-800">
                🎉
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Registration Successful!
              </h3>
              <p className="text-sm text-gray-300 mb-8">
                You are officially registered for{' '}
                <strong className="text-violet-400">
                  {workshopName}
                </strong>
                . Your ticket will be emailed within 24 hours. Please check your spam folder as well.
              </p>
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl transition-all shadow-md focus:outline-none"
              >
                Awesome!
              </button>
            </motion.div>
          ),
          { duration: 8000, id: 'success-toast' }
        );

        // Celebrate popper!
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
          confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#8b5cf6', '#a855f7', '#ec4899', '#f59e0b', '#10b981'],
          });
          confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#8b5cf6', '#a855f7', '#ec4899', '#f59e0b', '#10b981'],
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        };
        frame();

        setFormData(EMPTY_FORM);
        setScreenshotPreview('');
        try {
          const bc = typeof window !== 'undefined' && 'BroadcastChannel' in window
            ? new BroadcastChannel('registrations') : null;
          bc?.postMessage({ workshopId, action: 'registered' });
        } catch { /* ignore */ }
        setTimeout(() => { onSuccess?.(); }, 2500);
      } else {
        toast.error(data.message || 'Registration failed. Please try again.', { id: toastId });
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('An unexpected error occurred. Please try again.', { id: toastId });
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
    `w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600 bg-slate-800 border-slate-700 text-white ${errors[field] ? 'border-red-500' : ''
    }`;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-6 text-white rounded-t-2xl">
        <h2 className="text-2xl font-bold">{workshopName}</h2>
      </div>

      <div className="bg-slate-900 rounded-b-2xl shadow-xl">
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">

          {/* Row 1: First Name & Last Name */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-white">
                First Name <span className="text-red-500">*</span>
              </label>
              <input type="text" name="firstName" value={formData.firstName}
                onChange={handleInputChange} className={inputCls('firstName')} placeholder="John" />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white">
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
              <label className="block text-sm font-medium mb-2 text-white">
                Email <span className="text-red-500">*</span>
              </label>
              <input type="email" name="email" value={formData.email}
                onChange={handleInputChange} className={inputCls('email')} placeholder="john@example.com" />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white">
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
              <label className="block text-sm font-medium mb-2 text-white">
                Contact Number <span className="text-red-500">*</span>
              </label>
              <input type="tel" name="contactNumber" value={formData.contactNumber}
                onChange={handleInputChange} className={inputCls('contactNumber')} placeholder="9876543210" />
              {errors.contactNumber && <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white">
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

          {/* Row 4: UPI Payment */}
          <div className="rounded-xl border border-violet-800 bg-violet-950/30 p-4 space-y-4">
            <p className="text-sm font-semibold text-violet-300 flex items-center gap-2">
              <CreditCard className="w-4 h-4" /> Payment — UPI Only
            </p>

            {/* Transaction ID */}
            <div>
              <label className="block text-sm font-medium mb-2 text-white">
                Transaction ID <span className="text-red-500">*</span>
              </label>
              <input type="text" name="transactionId" value={formData.transactionId}
                onChange={handleInputChange} className={inputCls('transactionId')}
                placeholder="e.g. TXN123456789" autoComplete="off" />
              {errors.transactionId && <p className="text-red-500 text-sm mt-1">{errors.transactionId}</p>}
            </div>

            {/* Payment Screenshot */}
            <div>
              <label className="block text-sm font-medium mb-2 text-white">
                Payment Screenshot <span className="text-red-500">*</span>
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`cursor-pointer flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-lg py-6 transition
                    ${errors.paymentScreenshot ? 'border-red-500' : 'border-violet-700'}
                    hover:border-violet-400
                    bg-slate-800`}
              >
                {screenshotPreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={screenshotPreview} alt="Payment screenshot preview"
                    className="max-h-40 rounded-lg object-contain" />
                ) : (
                  <>
                    <Paperclip className="w-8 h-8 text-slate-400" />
                    <span className="text-sm text-slate-400">
                      Click to upload payment screenshot
                    </span>
                    <span className="text-xs text-slate-500">
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
              <label className="block text-sm font-medium mb-2 text-white">
                College Name <span className="text-red-500">*</span>
              </label>
              <input type="text" name="collegeName" value={formData.collegeName}
                onChange={handleInputChange} className={inputCls('collegeName')} placeholder="College Name" />
              {errors.collegeName && <p className="text-red-500 text-sm mt-1">{errors.collegeName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white">
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
              <label className="block text-sm font-medium mb-2 text-white">
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
              <label className="block text-sm font-medium mb-2 text-white">
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
            <label className="block text-sm font-medium mb-2 text-white">
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
              className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:from-violet-700 hover:to-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Registering...' : 'Register Now'}
            </button>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-slate-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-slate-600 transition"
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