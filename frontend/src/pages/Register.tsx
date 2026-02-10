import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronRight, ArrowLeft } from 'lucide-react';
import { EVENTS, WORKSHOPS } from '../constants';

const steps = ['Select Event', 'Participant Details', 'Review & Pay'];

const Register: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    idNumber: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const selectedItem = [...EVENTS, ...WORKSHOPS].find(e => e.id === selectedEventId);

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(prev => prev + 1);
    else {
      // Simulate API call
      setTimeout(() => setIsSuccess(true), 1500);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-slate-900 p-8 md:p-12 rounded-3xl border border-white/10 max-w-lg w-full text-center"
        >
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-white mb-4">Registration Successful!</h2>
          <p className="text-slate-400 mb-8">
            Thank you for registering for <span className="text-amber-400 font-bold">{selectedItem?.title}</span>.
            A confirmation email has been sent to {formData.email}.
          </p>
          <button onClick={() => window.location.reload()} className="px-8 py-3 bg-white text-slate-900 font-bold rounded-lg hover:bg-amber-400 transition-colors w-full">
            Register Another
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-4 pb-12">
      <div className="max-w-4xl mx-auto px-4">

        {/* Progress Bar */}
        <div className="mb-12 relative">
          <div className="flex justify-between items-center relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${idx <= currentStep ? 'bg-amber-400 text-slate-900 shadow-[0_0_15px_rgba(251,191,36,0.5)]' : 'bg-slate-800 text-slate-500 border border-slate-700'}`}>
                  {idx < currentStep ? <Check className="w-5 h-5" /> : idx + 1}
                </div>
                <div className={`mt-2 text-xs font-medium uppercase tracking-wider ${idx <= currentStep ? 'text-amber-400' : 'text-slate-600'}`}>
                  {step}
                </div>
              </div>
            ))}
          </div>
          {/* Connecting Line */}
          <div className="absolute top-5 left-0 w-full h-0.5 bg-slate-800 -z-0 transform -translate-y-1/2">
            <div
              className="h-full bg-amber-400 transition-all duration-300"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-slate-900 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          {/* Step 1: Selection */}
          {currentStep === 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-8"
            >
              <h2 className="text-2xl font-serif font-bold text-white mb-6">Choose your experience</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {[...EVENTS, ...WORKSHOPS].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedEventId(item.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 flex items-start space-x-4 ${selectedEventId === item.id ? 'bg-violet-600/20 border-violet-500' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
                  >
                    <img src={item.image} alt={item.title} className="w-16 h-16 rounded-lg object-cover bg-slate-800" />
                    <div className="flex-1">
                      <h3 className="text-white font-bold">{item.title}</h3>
                      <p className="text-xs text-slate-400 mt-1 uppercase">{(item as any).category || (item as any).domain}</p>
                      <div className="mt-2 text-amber-400 font-bold text-sm">
                        {item.price && item.price > 0 ? `$${item.price}` : 'Free'}
                      </div>
                    </div>
                    {selectedEventId === item.id && <div className="w-6 h-6 bg-violet-500 rounded-full flex items-center justify-center"><Check className="w-4 h-4 text-white" /></div>}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Form */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-8"
            >
              <h2 className="text-2xl font-serif font-bold text-white mb-6">Your Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-slate-400">Full Name</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-violet-500 outline-none" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-400">Email Address</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-violet-500 outline-none" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-400">Phone Number</label>
                  <input type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-violet-500 outline-none" placeholder="+1 (555) 000-0000" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-400">College / Institution</label>
                  <input type="text" value={formData.college} onChange={e => setFormData({ ...formData, college: e.target.value })} className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-violet-500 outline-none" placeholder="University Name" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm text-slate-400">ID Number (Student/Employee)</label>
                  <input type="text" value={formData.idNumber} onChange={e => setFormData({ ...formData, idNumber: e.target.value })} className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-violet-500 outline-none" placeholder="ID-123456" />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Review */}
          {currentStep === 2 && selectedItem && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-8"
            >
              <h2 className="text-2xl font-serif font-bold text-white mb-6">Review & Confirm</h2>

              <div className="bg-white/5 rounded-xl p-6 mb-8 border border-white/10">
                <div className="flex items-start space-x-4 mb-6 pb-6 border-b border-white/10">
                  <img src={selectedItem.image} alt={selectedItem.title} className="w-24 h-24 rounded-lg object-cover" />
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedItem.title}</h3>
                    <p className="text-slate-400 text-sm mt-1">{selectedItem.date}</p>
                    <p className="text-amber-400 font-bold text-lg mt-2">{selectedItem.price ? `$${selectedItem.price}` : 'Free'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="block text-slate-500">Name</span>
                    <span className="text-white font-medium">{formData.name}</span>
                  </div>
                  <div>
                    <span className="block text-slate-500">Email</span>
                    <span className="text-white font-medium">{formData.email}</span>
                  </div>
                  <div>
                    <span className="block text-slate-500">Phone</span>
                    <span className="text-white font-medium">{formData.phone}</span>
                  </div>
                  <div>
                    <span className="block text-slate-500">College</span>
                    <span className="text-white font-medium">{formData.college}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 mb-6">
                <input type="checkbox" id="terms" className="w-4 h-4 rounded bg-slate-800 border-slate-600 text-violet-600 focus:ring-violet-500" />
                <label htmlFor="terms" className="text-sm text-slate-400">I agree to the terms and conditions and privacy policy.</label>
              </div>
            </motion.div>
          )}

          {/* Footer Navigation */}
          <div className="p-6 bg-slate-950 border-t border-white/10 flex justify-between items-center">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`flex items-center px-6 py-2 rounded-lg font-medium transition-colors ${currentStep === 0 ? 'text-slate-600 cursor-not-allowed' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </button>

            <button
              onClick={handleNext}
              disabled={!selectedEventId}
              className={`flex items-center px-8 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-violet-500/30 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {currentStep === steps.length - 1 ? 'Complete Payment' : 'Continue'} <ChevronRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
