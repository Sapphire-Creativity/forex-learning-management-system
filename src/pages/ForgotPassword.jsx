import React from "react";
import { useState } from "react";
import { useSignIn } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState("request");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRequestReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    //
    try {
      console.log(email);
      const signInAttempt = await signIn.create({ identifier: email });
      console.log("attempt details: ", signInAttempt);

      const emailAddressId = signInAttempt?.supportedFirstFactors?.find(
        (f) => f.strategy === "reset_password_email_code"
      )?.emailAddressId;

      if (!emailAddressId) {
        throw new Error("No email_address_id found for this account.");
      }

      //
      await signIn.prepareFirstFactor({
        strategy: "reset_password_email_code",
        emailAddressId,
      });

      toast.success("Reset code sent! Check your email.");
      setStep("verify");
    } catch (err) {
      console.error("Reset error: ", err);
      toast.error(
        err.errors?.[0]?.message || "Failed to send reset code. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify code + set new password

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    //
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password: newPassword,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        toast.success("✅ Password reset successfully!");
        navigate("/post-auth", { replace: true });
      } else {
        console.warn("Unexpected status:", result.status);
      }
    } catch (err) {
      console.error("Verification error:", err);
      toast.error(
        err.errors?.[0]?.message || "Invalid code or password. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center p-4">
      <div className="flex flex-col max-w-6xl mx-auto p-6 md:p-12 bg-white rounded-2xl shadow ">
        {step === "request" && (
          <form
            onSubmit={handleRequestReset}
            className="flex flex-col items-center justify-center  text-center  "
          >
            <h3 className="text-primary text-2xl md:text-3xl font-bold font-raleway text-center">
              Forgot Password
            </h3>

            <span className="bg-primary h-[0.15rem] w-16 rounded-full mx-auto"></span>

            <p className="text-gray-500 text-center text-sm">
              Enter your email address to receive a reset code.
            </p>

            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-3 w-full border rounded-xl p-4 text-gray-600 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full p-4 bg-primary text-xs  text-white font-medium rounded-xl hover:bg-primary-dark transition-all duration-700"
            >
              {loading ? "Sending..." : "Send Reset Code"}
            </button>
          </form>
        )}

        {/*  */}
        {step === "verify" && (
          <form onSubmit={handleResetPassword} className="">
            <h3 className="text-primary text-2xl md:text-3xl font-bold font-raleway text-center">
              Reset Your Password
            </h3>

            <input
              type="text"
              placeholder="Enter verification code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              className=" w-full border rounded-xl p-4 text-gray-600 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />

            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full border rounded-xl p-4 text-gray-600 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full p-4 bg-primary text-xs  text-white font-medium rounded-xl hover:bg-primary-dark transition-all duration-700"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>

            <p
              onClick={() => setStep("request")}
              className="text-blue-600 text-center text-sm cursor-pointer"
            >
              ← Back to email entry
            </p>
          </form>
        )}
      </div>
    </section>
  );
};

export default ForgotPassword;
