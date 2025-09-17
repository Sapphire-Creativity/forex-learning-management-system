import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiArrowLongLeft,
  HiArrowLongRight,
  HiMiniArrowLongRight,
} from "react-icons/hi2";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
const ForexLMSOnboarding = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  //
  const { user } = useUser();
  const [formData, setFormData] = useState({
    role: "",
    name: "",
    username: "",
    profileBio: "",
    experience: "",
    tradingStyle: [],
    goals: [],
    timeCommitment: "",
    mentorPreferences: "",
    riskAppetite: 5,
    instruments: [],
    timezone: "",
    availability: [],
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelect = (name, value) => {
    setFormData((prev) => {
      const currentValues = prev[name];
      if (currentValues.includes(value)) {
        return {
          ...prev,
          [name]: currentValues.filter((item) => item !== value),
        };
      } else {
        return { ...prev, [name]: [...currentValues, value] };
      }
    });
  };

  const handleSliderChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: parseInt(value) }));
  };

  const handleOnboardingSubmit = async () => {
    console.log("clicked!");
    try {
      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          onboarded: true, // ✅ flip to true
          // studentProfile: formData,
        },
      });

      navigate("/student");
    } catch (err) {
      console.error("Error updating onboarding metadata:", err);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
    exit: { opacity: 0 },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  };

  return (
    <div className="min-h-screen  text-white flex items-center justify-center p-4">
      <div className="min-h-[90vh] rounded-2xl shadow w-full max-w-6xl overflow-hidden">
        <div className="relative h-2 bg-primary-dark/20">
          <motion.div
            className="h-full bg-gradient-to-r from-secondary to-primary"
            initial={{ width: "0%" }}
            animate={{ width: `${(step / 5) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <RoleSelection
                key="step1"
                formData={formData}
                handleChange={handleChange}
                nextStep={nextStep}
                variants={containerVariants}
                itemVariants={itemVariants}
              />
            )}

            {step === 2 && (
              <BasicInfo
                key="step2"
                formData={formData}
                handleChange={handleChange}
                nextStep={nextStep}
                prevStep={prevStep}
                variants={containerVariants}
                itemVariants={itemVariants}
              />
            )}

            {step === 3 && (
              <TradingProfile
                key="step3"
                formData={formData}
                handleChange={handleChange}
                handleMultiSelect={handleMultiSelect}
                handleSliderChange={handleSliderChange}
                nextStep={nextStep}
                prevStep={prevStep}
                variants={containerVariants}
                itemVariants={itemVariants}
              />
            )}

            {step === 4 && (
              <LearningGoals
                key="step4"
                formData={formData}
                handleChange={handleChange}
                handleMultiSelect={handleMultiSelect}
                nextStep={nextStep}
                prevStep={prevStep}
                variants={containerVariants}
                itemVariants={itemVariants}
              />
            )}

            {step === 5 && (
              <MentorPreferences
                key="step5"
                formData={formData}
                handleChange={handleChange}
                handleMultiSelect={handleMultiSelect}
                submitForm={handleOnboardingSubmit}
                prevStep={prevStep}
                variants={containerVariants}
                itemVariants={itemVariants}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// Step 1: Role Selection
const RoleSelection = ({
  formData,
  handleChange,
  nextStep,
  variants,
  itemVariants,
}) => {
  const handleRoleSelect = (role) => {
    handleChange({ target: { name: "role", value: role } });
    setTimeout(nextStep, 500);
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="text-center flex flex-col items-center justify-center pt-10 h-[80vh]"
    >
      <motion.h2
        variants={itemVariants}
        className="text-primary text-3xl md:text-4xl font-raleway font-bold "
      >
        👋 Hey there, <br /> welcome aboard!
      </motion.h2>

      <motion.p variants={itemVariants} className="text-gray-700 my-3">
        Let’s get to know you better and kickstart your journey
      </motion.p>

      <motion.button
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={nextStep}
        className="btn btn-primary flex items-center justify-center gap-2 "
      >
        Get Started <HiArrowLongRight size={20} />
      </motion.button>

      {/* <motion.h2
        variants={itemVariants}
        className="text-3xl font-bold mb-2 text-primary"
      >
        Welcome to Sapph'reFX
      </motion.h2>
      <motion.p
        variants={itemVariants}
        className="text-gray-300 mb-8 text-primary-dark "
      >
        Are you here to learn or to teach?
      </motion.p>

      <div className="flex flex-col md:flex-row gap-6 justify-center mt-10">
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`cursor-pointer p-6 rounded-2xl border-2 transition-all ${
            formData.role === "student"
              ? "border-cyan-400 bg-primary-dark bg-opacity-20 text-white"
              : "border-gray-700 hover:border-primary"
          }`}
          onClick={() => handleRoleSelect("student")}
        >
          <div className="text-5xl mb-4">🎓</div>
          <h3 className="text-xl font-semibold mb-2 text-primary">Student</h3>
          <p className="text-gray-700">
            I want to learn forex trading from experts
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`cursor-pointer p-6 rounded-2xl border-2 transition-all ${
            formData.role === "mentor"
              ? "border-primary bg-cyan-900 bg-opacity-20"
              : "border-gray-700 hover:border-cyan-500"
          }`}
          onClick={() => handleRoleSelect("mentor")}
        >
          <div className="text-5xl mb-4">👨‍🏫</div>
          <h3 className="text-xl font-semibold mb-2 text-primary">Mentor</h3>
          <p className="text-gray-700">I want to share my trading knowledge</p>
        </motion.div>
      </div> */}
    </motion.div>
  );
};

// Step 2: Basic Information
const BasicInfo = ({
  formData,
  handleChange,
  nextStep,
  prevStep,
  variants,
  itemVariants,
}) => {
  const isFormValid = formData.name && formData.username && formData.profileBio;

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.h2
        variants={itemVariants}
        className="text-3xl md:text-4xl text-primary font-raleway font-bold mb-2 text-center"
      >
        Tell us about yourself
      </motion.h2>
      <motion.p
        variants={itemVariants}
        className="text-gray-700 mb-8 text-center"
      >
        Let's create your personalized {formData.role} profile
      </motion.p>

      <motion.div variants={itemVariants} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full  border border-gray-200 rounded-xl px-4 py-3 text-gray-600 focus:outline-none focus:ring-1 focus:ring-primary text-xs md:text-sm"
            placeholder="Enter your full name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-600 focus:outline-none focus:ring-1 focus:ring-primary text-xs md:text-sm"
            placeholder="Enter your preferred username"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Bio
          </label>
          <textarea
            type="text"
            name="profileBio"
            rows={3}
            value={formData.profileBio}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-600 focus:outline-none focus:ring-1 focus:ring-primary text-xs md:text-sm"
            placeholder="short bio about you"
          />
        </div>
      </motion.div>

      <div className="flex justify-between mt-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={prevStep}
          className="flex items-center justify-center gap-2 text-sm  text-primary font-medium"
        >
          <HiArrowLongLeft size={20} />
          Back
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={nextStep}
          disabled={!isFormValid}
          className={`flex items-center justify-center gap-2 text-sm font-medium ${
            isFormValid ? "text-primary" : "text-gray-400 cursor-not-allowed"
          }`}
        >
          Continue <HiMiniArrowLongRight size={20} />
        </motion.button>
      </div>
    </motion.div>
  );
};

// Step 3: Trading Profile
const TradingProfile = ({
  formData,
  handleChange,
  handleMultiSelect,
  handleSliderChange,
  nextStep,
  prevStep,
  variants,
  itemVariants,
}) => {
  const experienceLevels = ["Beginner", "Intermediate", "Advanced", "Expert"];
  const tradingStyles = [
    "Scalping",
    "Day Trading",
    "Swing Trading",
    "Position Trading",
  ];
  const instruments = [
    "Forex",
    "Indices",
    "Commodities",
    "Cryptocurrencies",
    "Stocks",
  ];

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.h2
        variants={itemVariants}
        className="text-3xl text-primary font-raleway font-bold mb-2 text-center"
      >
        Your Trading Profile
      </motion.h2>
      <motion.p
        variants={itemVariants}
        className="text-gray-700 mb-8 text-center"
      >
        Help us customize your learning experience
      </motion.p>

      <motion.div variants={itemVariants} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Experience Level
          </label>
          <div className="grid grid-cols-2 gap-3">
            {experienceLevels.map((level) => (
              <motion.button
                key={level}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  handleChange({ target: { name: "experience", value: level } })
                }
                className={`py-3 rounded-full border text-xs md:text-sm ${
                  formData.experience === level
                    ? "border-primary bg-primary-dark bg-opacity-20"
                    : "border-gray-500 text-gray-600"
                }`}
              >
                {level}
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Preferred Trading Style(s)
          </label>
          <div className="flex flex-wrap gap-3">
            {tradingStyles.map((style) => (
              <motion.button
                key={style}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleMultiSelect("tradingStyle", style)}
                className={`px-4 py-2 rounded-full border text-xs md:text-sm ${
                  formData.tradingStyle.includes(style)
                    ? "border-primary bg-primary-dark bg-opacity-20"
                    : "border-gray-600 text-gray-600"
                }`}
              >
                {style}
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Preferred Instruments
          </label>
          <div className="flex flex-wrap gap-3">
            {instruments.map((instrument) => (
              <motion.button
                key={instrument}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleMultiSelect("instruments", instrument)}
                className={`px-4 py-2 rounded-full border text-xs md:text-sm ${
                  formData.instruments.includes(instrument)
                    ? "border-primary bg-primary-dark bg-opacity-20"
                    : "border-gray-600 text-gray-600"
                }`}
              >
                {instrument}
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Risk Appetite: {formData.riskAppetite}/10
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={formData.riskAppetite}
            onChange={(e) => handleSliderChange("riskAppetite", e.target.value)}
            className="w-full h-2 bg-primary-dark rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-600 mt-1">
            <span>Conservative</span>
            <span>Balanced</span>
            <span>Aggressive</span>
          </div>
        </div>
      </motion.div>

      {/*  */}
      <div className="flex justify-between mt-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={prevStep}
          className="flex items-center justify-center gap-2 text-sm  text-primary font-medium"
        >
          <HiArrowLongLeft size={20} />
          Back
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={nextStep}
          className="flex items-center justify-center gap-2 text-sm  text-primary font-medium"
        >
          Continue <HiMiniArrowLongRight size={20} />
        </motion.button>
      </div>
    </motion.div>
  );
};

// Step 4: Learning Goals
const LearningGoals = ({
  formData,
  handleChange,
  handleMultiSelect,
  nextStep,
  prevStep,
  variants,
  itemVariants,
}) => {
  const goals = [
    "Understand Basics",
    "Develop Strategy",
    "Risk Management",
    "Technical Analysis",
    "Fundamental Analysis",
    "Psychology of Trading",
  ];

  const timeCommitments = [
    "< 5 hours/week",
    "5-10 hours/week",
    "10-20 hours/week",
    "20+ hours/week",
  ];

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.h2
        variants={itemVariants}
        className="text-3xl md:text-4xl font-raleway text-primary font-bold mb-2 text-center"
      >
        Your Learning Goals
      </motion.h2>
      <motion.p
        variants={itemVariants}
        className="text-gray-600 mb-8 text-center"
      >
        What do you want to achieve?
      </motion.p>

      <motion.div variants={itemVariants} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Primary Goals
          </label>
          <div className="grid grid-cols-2 gap-3">
            {goals.map((goal) => (
              <motion.button
                key={goal}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleMultiSelect("goals", goal)}
                className={`py-3 rounded-full border text-xs md:text-sm ${
                  formData.goals.includes(goal)
                    ? "border-primary bg-primary-dark bg-opacity-20"
                    : "border-gray-600 text-gray-600"
                }`}
              >
                {goal}
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Time Commitment
          </label>
          <div className="grid grid-cols-2 gap-3">
            {timeCommitments.map((time) => (
              <motion.button
                key={time}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  handleChange({
                    target: { name: "timeCommitment", value: time },
                  })
                }
                className={`py-3 rounded-full border text-xs md:text-sm ${
                  formData.timeCommitment === time
                    ? "border-primary bg-primary-dark bg-opacity-20"
                    : "border-gray-600 text-gray-600"
                }`}
              >
                {time}
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Timezone
          </label>
          <select
            name="timezone"
            value={formData.timezone}
            onChange={handleChange}
            className="w-full border border-primary rounded-full px-4 py-3 text-primary-dark focus:outline-none focus:ring-1 focus:ring-primary text-xs md:text-sm"
          >
            <option value="">Select your timezone</option>
            <option value="EST">Eastern Time (EST)</option>
            <option value="PST">Pacific Time (PST)</option>
            <option value="CST">Central Time (CST)</option>
            <option value="GMT">Greenwich Mean Time (GMT)</option>
            <option value="CET">Central European Time (CET)</option>
            <option value="AEST">Australian Eastern Time (AEST)</option>
          </select>
        </div>
      </motion.div>

      <div className="flex justify-between mt-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={prevStep}
          className="flex items-center justify-center gap-2 text-sm  text-primary font-medium"
        >
          <HiArrowLongLeft size={20} />
          Back
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={nextStep}
          className="flex items-center justify-center gap-2 text-sm  text-primary font-medium"
        >
          Continue <HiMiniArrowLongRight size={20} />
        </motion.button>
      </div>
    </motion.div>
  );
};

// Step 5: Mentor Preferences
const MentorPreferences = ({
  formData,
  handleChange,
  handleMultiSelect,
  submitForm,
  prevStep,
  variants,
  itemVariants,
}) => {
  const availability = ["Morning", "Afternoon", "Evening", "Weekends"];
  const mentorTypes = [
    "Strict",
    "Supportive",
    "Technical",
    "Fundamental",
    "High Frequency",
    "Long Term",
  ];

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.h2
        variants={itemVariants}
        className="text-3xl md:text-4xl text-primary font-bold mb-2 text-center"
      >
        Mentor Preferences
      </motion.h2>
      <motion.p
        variants={itemVariants}
        className="text-gray-600 mb-8 text-center"
      >
        Help us match you with the perfect mentor
      </motion.p>

      <motion.div variants={itemVariants} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Preferred Mentor Style
          </label>
          <div className="flex flex-wrap gap-3">
            {mentorTypes.map((type) => (
              <motion.button
                key={type}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleMultiSelect("mentorPreferences", type)}
                className={`px-4 py-2 rounded-full border text-xs md:text-sm ${
                  formData.mentorPreferences.includes(type)
                    ? "border-primary bg-primary-dark bg-opacity-20"
                    : "border-gray-600 text-gray-600"
                }`}
              >
                {type}
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Your Availability
          </label>
          <div className="flex flex-wrap gap-3">
            {availability.map((period) => (
              <motion.button
                key={period}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleMultiSelect("availability", period)}
                className={`px-4 py-2 rounded-full border text-xs md:text-sm ${
                  formData.availability.includes(period)
                    ? "border-primary bg-primary-dark bg-opacity-20"
                    : "border-gray-600 text-gray-600"
                }`}
              >
                {period}
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Anything else we should know? (Optional)
          </label>
          <textarea
            name="additionalInfo"
            onChange={handleChange}
            className="w-full border border-gray-600 text-xs md:text-sm rounded-xl px-4 py-3 text-gray-600 focus:outline-none focus:ring-1 focus:ring-primary"
            rows="3"
            placeholder="Share any specific requirements or preferences..."
          />
        </div>
      </motion.div>

      <div className="flex justify-between mt-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={prevStep}
          className="flex items-center justify-center gap-2 text-sm  text-primary font-medium"
        >
          <HiArrowLongLeft size={20} />
          Back
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={submitForm}
          className="flex items-center justify-center gap-2 text-sm  text-primary font-medium"
        >
          Complete Onboarding
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ForexLMSOnboarding;
