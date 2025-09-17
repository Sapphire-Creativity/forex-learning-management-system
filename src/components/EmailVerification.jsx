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
    <div className="flex flex-col max-w-3xl">
      <form onSubmit={handleVerification}>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
          className="w-full border rounded-xl px-4 py-2 text-gray-600 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="Enter verification code"
        />

        <div className="flex items-center gap-3 mt-3">
          <button type="submit" className="btn btn-primary">
            Verify Email
          </button>

          <button
            type="button"
            onClick={resendCode}
            className="btn btn-secondary"
          >
            Resend Code
          </button>
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}
        {message && <p className="text-green-500 mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default EmailVerification;
