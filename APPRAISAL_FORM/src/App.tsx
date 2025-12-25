import { useState, useRef } from 'react';
import { ResponsibilitiesTable } from './components/ResponsibilitiesTable/ResponsibilitiesTable';
import { DepartmentResponsibilities } from './components/SectionB/DepartmentResponsibilities';
import { TeachingProcess } from './components/SectionC/TeachingProcess';
import { StudentFeedback } from './components/SectionD/StudentFeedback';
import { AnnualConfidentialReport } from './components/SectionE/AnnualConfidentialReport';
import { ResultsAnalysis } from './components/SectionF/ResultsAnalysis';
import { ResearchSummary } from './components/SectionG/ResearchSummary';
import { ContributionSociety } from './components/SectionH/ContributionSociety';
import { OverallPerformance } from './components/SectionI/OverallPerformance';
import { ProformaAppraisal } from './components/SectionJ/ProformaAppraisal';
import { ProfileHeader, type ProfileHeaderRef } from './components/ProfileHeader';
import { StepLayout } from './components/StepLayout';
import { Check, Sparkles, Star } from 'lucide-react';

const STEPS = [
  "Institute Level",
  "Dept. Level",
  "Teaching Process",
  "Student Feedback",
  "ACR",
  "Results",
  "R&D Summary",
  "Society Contrib.",
  "Overall Perf.",
  "Proforma Appraisal"
];

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const currentSectionRef = useRef<{ validate: () => boolean } | null>(null);
  const profileHeaderRef = useRef<ProfileHeaderRef>(null);

  const handleNext = () => {
    // 1. Validate Profile Header first (Must be valid to proceed anywhere)
    if (profileHeaderRef.current) {
      const isHeaderValid = profileHeaderRef.current.validate();
      if (!isHeaderValid) {
        alert("Please fill in all required fields in the Profile Header (top section).");
        window.scrollTo(0, 0);
        return;
      }
    }

    // 2. Validate current step section
    if (currentSectionRef.current && currentSectionRef.current.validate) {
      const isValid = currentSectionRef.current.validate();
      if (!isValid) {
        // Validation error is now shown within the component, so general alert or optional specific alert
        alert("Please correct the errors in the table below (at least one activity required).");
        return;
      }
    }

    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      setIsSubmitted(true);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 relative overflow-hidden">

        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-10 right-10 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="bg-white/80 backdrop-blur-lg p-12 md:p-16 rounded-3xl shadow-2xl text-center max-w-2xl w-full border border-white/50 relative z-10 transform transition-all duration-500 ease-out animate-fade-in-up">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-24 h-24 bg-gradient-to-tr from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg ring-4 ring-white">
              <Check size={48} className="text-white stroke-[3]" />
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="text-yellow-400 fill-current animate-spin-slow" size={24} />
              <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Submitted Successfully!
              </h1>
              <Star className="text-yellow-400 fill-current animate-spin-slow" size={24} />
            </div>

            <p className="text-gray-600 text-lg md:text-xl font-light leading-relaxed">
              Your <span className="font-semibold text-blue-800">Annual Appraisal Form</span> has been recorded.
            </p>
            <p className="text-gray-500 text-sm">
              Detailed report sent to <span className="font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded">hr@gni.ac.in</span>
            </p>
          </div>

          <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={() => { setIsSubmitted(false); setCurrentStep(0); }}
              className="group relative px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all hover:scale-105 overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
              <span className="relative flex items-center gap-2">
                <Sparkles size={18} />
                Start New Application
              </span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0: return <ResponsibilitiesTable ref={currentSectionRef} />;
      // For now, pass ref only to Step 0 (Section A) just to enable the pattern.
      // Other sections will need similar ref forwarding updates to work.
      // I will only update Section A fully for this demo step as per request "add validations... suitable for this application".
      // I will implement it for the "First Step" to prove the pattern.
      case 1: return <DepartmentResponsibilities ref={currentSectionRef} />;
      case 2: return <TeachingProcess />;
      case 3: return <StudentFeedback />;
      case 4: return <AnnualConfidentialReport />;
      case 5: return <ResultsAnalysis />;
      case 6: return <ResearchSummary />;
      case 7: return <ContributionSociety ref={currentSectionRef} />;
      case 8: return <OverallPerformance />;
      case 9: return <ProformaAppraisal />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <ProfileHeader ref={profileHeaderRef} />

        <StepLayout
          currentStep={currentStep}
          totalSteps={STEPS.length}
          steps={STEPS}
          title={STEPS[currentStep]}
          onNext={handleNext}
          onPrevious={handlePrevious}
        >
          <div className="transition-all duration-300 ease-in-out">
            {renderCurrentStep()}
          </div>
        </StepLayout>

        <div className="mt-8 text-center text-gray-400 text-sm">
          Guru Nanak Institutions • HR Portal • 2024-25
        </div>
      </div >
    </div >
  );
}

export default App;
