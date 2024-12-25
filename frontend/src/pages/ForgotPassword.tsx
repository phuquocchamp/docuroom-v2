import { Link } from 'react-router-dom';

function ForgotPassword() {
  return (
    <div className="h-screen flex flex-col md:flex-row">

      {/* Left Side - Image and Text */}
      <div className="hidden md:block w-1/2 h-full bg-primary-blue relative flex items-center justify-center">
        <div className="absolute pb-24 top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
          <h2 className="text-3xl font-semibold">Share Document and Study Group Platform</h2>
          <p className="text-lg font-light mt-2">Join us and collaborate with others!</p>
        </div>

        <div className="w-4/5">
          <img
            src="/login/online-group.png"
            className="w-full h-auto pt-20 ml-20"
            alt="Forgot Password Illustration"
          />
        </div>
      </div>

      {/* Right Side - Forgot Password Form */}
      <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-center bg-white px-8 md:px-16 relative">
        {/* Logo */}
        <img src="logodocuroom.png" alt="Logo" className="absolute top-12 left-12 md:left-24 w-40 h-auto" />
        {/* Form Container */}
        <div className="w-full max-w-sm mt-20">
          <h3 className="text-3xl font-semibold mb-6 text-center">Forgot Password</h3>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-primary-blue text-lg"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-primary-blue transition duration-300 text-lg"
            >
              Send Password Reset Request
            </button>
          </form>

          <p className="text-center text-gray-500 my-4">
            Remembered your password?{' '}
            <Link to="/" className="text-primary-blue hover:underline">
              Login now
            </Link>
          </p>

          <p className="text-center text-gray-500">
            Or you can go back to{' '}
            <Link to="/signup" className="text-primary-blue hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
