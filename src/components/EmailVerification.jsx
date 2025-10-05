import React from "react";

const EmailVerification = ({
  handleVerification, // called on form submit
  code, // verification code value
  setCode, // setter for code input
  resendCode, // resend handler
  message, // success/info messages
  error, // error messages
}) => {
  return (
    <div className="flex flex-col max-w-4xl bg-white rounded-2xl shadow p-4">
      <h3 className="text-primary text-2xl md:text-3xl font-bold font-raleway text-center">
        Check Your Email!
      </h3>
      <p className="text-gray-600 text-xs mt-1 text-center">
        Verification code has been send to your email
      </p>
      <form
        onSubmit={handleVerification}
        className="flex flex-col items-center justify-center"
      >
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
          className="mt-3 w-full border rounded-xl p-4 text-gray-600 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="Enter verification code"
        />

        <div className="flex items-center justify-center w-full gap-3 mt-2">
          <button
            type="submit"
            className="w-full p-4 bg-primary text-xs  text-white font-medium rounded-xl hover:bg-primary-dark transition-all duration-700"
          >
            Verify Email
          </button>

          <button
            type="button"
            onClick={resendCode}
            className="w-full p-4 border border-primary hover:border-0 bg-white text-xs  text-primary font-medium rounded-xl hover:bg-primary hover:text-white transition-all duration-700"
          >
            Resend Code
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-xs text-center mt-1">{error}</p>
        )}
        {message && (
          <p className="text-green-500 text-xs text-center mt-1">{message}</p>
        )}
      </form>
    </div>
  );
};

export default EmailVerification;
