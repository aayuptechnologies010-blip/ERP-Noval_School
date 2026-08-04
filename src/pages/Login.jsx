import React, { useState } from 'react';
import { FaInstagram, FaTwitter, FaLinkedin, FaYoutube, FaEye, FaEyeSlash, FaVideo, FaPhoneAlt, FaRegCalendarAlt, FaRegClock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error('Please enter both username and password!');
      return;
    }
    
    if (username === 'sf032' && password === '78667') {
      Swal.fire({
        title: 'Success!',
        text: 'Login successful',
        icon: 'success',
        confirmButtonColor: '#4CAF50',
      }).then(() => {
        navigate('/dashboard');
      });
    } else {
      toast.error('Invalid Username or Password!');
    }
  };

  return (
    <div className="flex min-h-screen w-full font-sans bg-white">
      {/* Left Panel */}
      <div className="relative flex flex-col items-center w-1/2 min-h-full justify-start pt-12 pb-32 border-r border-gray-200 overflow-hidden">
        
        {/* Social Icons */}
        <div className="absolute left-6 top-1/6 flex flex-col gap-6 text-green-500 text-2xl z-10">
          <a href="#" className="hover:text-green-600 transition"><FaInstagram /></a>
          <a href="#" className="hover:text-green-600 transition"><FaTwitter /></a>
          <a href="#" className="hover:text-green-600 transition"><FaLinkedin /></a>
          <a href="#" className="hover:text-green-600 transition"><FaYoutube /></a>
        </div>

        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8 z-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold italic">e</div>
            <div className="flex flex-col">
              <span className="text-gray-800 font-bold leading-tight">FRANCISCAN™</span>
              <span className="text-green-500 font-bold text-2xl leading-tight">e-care</span>
              <span className="text-gray-500 text-xs">we value your care</span>
            </div>
          </div>
          
          <h2 className="text-gray-600 mt-4 text-sm">Welcome to the most trusted</h2>
          <h1 className="text-xl font-bold text-gray-800">School Management System</h1>
        </div>

        {/* Download Section */}
        <div className="flex flex-col items-center z-10 mb-8">
          <p className="text-gray-700 font-semibold mb-3">Download Now</p>
          <div className="flex gap-4">
            <a href="#" className="hover:opacity-80 transition">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-10" />
            </a>
            <a href="#" className="hover:opacity-80 transition">
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="Download on the App Store" className="h-10" />
            </a>
          </div>
        </div>

        {/* Phone Mockup Placeholder */}
        <div className="relative z-10 w-72 h-[600px] bg-gray-800 rounded-[2.5rem] border-8 border-gray-800 overflow-hidden flex flex-col items-center shadow-xl">
           <div className="w-1/2 h-5 bg-gray-800 absolute top-0 rounded-b-2xl z-20"></div>
           <div className="w-full h-full bg-black flex items-center justify-center relative">
             <video 
               src="https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4" 
               className="w-full h-full object-cover"
               autoPlay 
               loop 
               muted 
               playsInline
             ></video>
           </div>
        </div>

        {/* Bottom Green Curve with Customer Care Info */}
        <div className="absolute bottom-0 w-[150%] h-64 bg-[#5cb85c] rounded-t-[50%] flex flex-col items-center justify-start pt-10 text-white z-20">
          <div className="flex items-center gap-4">
            <FaPhoneAlt className="text-4xl" />
            <div className="flex flex-col">
              <span className="text-sm">e-Care Customer Care</span>
              <span className="font-bold text-2xl tracking-wide">95 246 246 95</span>
            </div>
          </div>
          
          <div className="w-1/3 h-px bg-white/50 my-4"></div>
          
          <div className="flex items-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <FaRegCalendarAlt />
              <span>Monday to Saturday</span>
            </div>
            <div className="flex items-center gap-2">
              <FaRegClock />
              <span>8:00 AM to 5:00 PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/2 h-full flex flex-col items-center justify-center relative bg-gray-50 overflow-hidden">
        {/* Background Pattern Placeholder (using CSS for faint look) */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M54.627 0l.83.83-54.627 54.627-.83-.83zM30.627 0l.83.83-30.627 30.627-.83-.83zM0 30.627l.83.83-30.627 30.627-.83-.83z\' fill=\'%23000000\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")', backgroundSize: '100px' }}></div>

        <div className="z-10 w-full max-w-md p-8 flex flex-col items-center">
          <h1 className="text-red-600 font-bold text-2xl tracking-wide mb-12 text-center uppercase">Navals National Academy</h1>

          <form onSubmit={handleLogin} className="w-full flex flex-col gap-6">
            <div className="flex flex-col">
              <label className="flex items-center gap-2 text-gray-600 font-medium mb-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter the Username"
                className="border border-gray-300 rounded-md p-3 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="flex flex-col relative">
              <label className="flex items-center gap-2 text-gray-600 font-medium mb-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter the Password"
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#5cb85c] hover:bg-[#4cae4c] text-white font-bold py-3 rounded-md mt-2 transition"
            >
              Login
            </button>

            <div className="flex justify-end">
              <a href="#" className="text-blue-600 text-sm hover:underline">Forgot Password?</a>
            </div>
          </form>

          <div className="mt-8 flex items-center gap-2 cursor-pointer hover:opacity-80 transition">
            <span className="font-bold text-gray-800">Video Tutorial</span>
            <FaVideo className="text-green-500 text-2xl" />
          </div>

          <div className="mt-12 flex flex-col items-center w-full">
            <div className="flex items-center gap-4">
              <div className="border-2 border-gray-700 p-2 rounded-md">
                <FaPhoneAlt className="text-2xl text-gray-700" />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-600 text-sm">School Helpline Number</span>
                <span className="font-bold text-xl text-gray-800">8299331845</span>
              </div>
            </div>
            <div className="w-full h-px bg-gray-200 mt-6"></div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Login;
