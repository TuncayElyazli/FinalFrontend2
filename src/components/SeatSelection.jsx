import React, { useState, useMemo } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { allMovies } from '../data/movies';

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const COLS = Array.from({ length: 10 }, (_, i) => i + 1);
const TICKET_PRICE = 15; // $15 per ticket

// Mock some already booked seats
const MOCK_BOOKED = ['A-5', 'A-6', 'D-4', 'D-5', 'D-6', 'G-1', 'G-2', 'J-9', 'J-10'];

const SeatSelection = ({ movie: propMovie, onBack: propOnBack }) => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const movie = propMovie || location.state?.movie || allMovies.find(m => String(m.id) === String(id));
  const onBack = propOnBack || (() => navigate(-1));
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const toggleSeat = (seatId) => {
    if (MOCK_BOOKED.includes(seatId)) return;
    
    setSelectedSeats(prev => 
      prev.includes(seatId) 
        ? prev.filter(s => s !== seatId)
        : [...prev, seatId]
    );
  };

  const handlePayment = () => {
    if (selectedSeats.length === 0) return;
    setPaymentSuccess(true);
    // In a real app, this would redirect or trigger a modal
    setTimeout(() => {
      setPaymentSuccess(false);
      setSelectedSeats([]); // reset after success
    }, 3000);
  };

  const totalPrice = selectedSeats.length * TICKET_PRICE;

  return (
    <div className="min-h-screen bg-slate-950 pt-28 pb-40 animate-fade-in text-white">
      <div className="max-w-[1440px] mx-auto px-8">
        
        {/* Header */}
        <div className="flex items-center gap-6 mb-12">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-cyan-500 hover:text-slate-950 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold">{movie?.title || "Select Seats"}</h1>
            <p className="text-cyan-400 font-medium mt-1">Screen 1 • English • 2D</p>
          </div>
        </div>

        {/* The Screen */}
        <div className="relative w-full max-w-4xl mx-auto mb-20 perspective-[1000px]">
          <div className="h-16 w-full rounded-t-[50%] bg-gradient-to-t from-cyan-500/20 to-cyan-400/5 border-t border-cyan-400 shadow-[0_-15px_40px_rgba(34,211,238,0.3)] flex items-end justify-center pb-2 relative overflow-hidden">
            <div className="absolute top-0 w-full h-[1px] bg-cyan-300 shadow-[0_0_20px_2px_rgba(34,211,238,0.8)]"></div>
            <span className="text-cyan-400/50 text-sm font-semibold tracking-[1em] uppercase">Screen</span>
          </div>
        </div>

        {/* Seat Grid */}
        <div className="flex flex-col items-center gap-4 max-w-4xl mx-auto">
          {ROWS.map(row => (
            <div key={row} className="flex items-center gap-8">
              <span className="text-gray-500 font-bold w-6 text-center">{row}</span>
              
              <div className="flex gap-3">
                {COLS.map(col => {
                  const seatId = `${row}-${col}`;
                  const isBooked = MOCK_BOOKED.includes(seatId);
                  const isSelected = selectedSeats.includes(seatId);

                  // Base styles
                  let seatClasses = "w-8 h-8 rounded-t-lg rounded-b-sm border-b-4 text-xs font-semibold flex items-center justify-center transition-all duration-300 ease-out select-none ";
                  
                  if (isBooked) {
                    seatClasses += "bg-slate-800 border-slate-900 opacity-30 cursor-not-allowed";
                  } else if (isSelected) {
                    seatClasses += "bg-emerald-500 border-emerald-700 shadow-[0_0_15px_rgba(16,185,129,0.6)] scale-110 text-emerald-950";
                  } else {
                    seatClasses += "bg-slate-700 border-slate-800 text-transparent hover:text-white hover:-translate-y-1 hover:bg-indigo-500 hover:border-indigo-700 cursor-pointer";
                  }

                  return (
                    <div 
                      key={seatId} 
                      className={seatClasses}
                      onClick={() => toggleSeat(seatId)}
                      title={seatId}
                    >
                      {col}
                    </div>
                  );
                })}
              </div>
              
              <span className="text-gray-500 font-bold w-6 text-center">{row}</span>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex justify-center items-center gap-8 mt-16">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-t-sm border-b-2 bg-slate-700 border-slate-800"></div>
            <span className="text-sm text-gray-400">Available</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-t-sm border-b-2 bg-emerald-500 border-emerald-700 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
            <span className="text-sm text-gray-400">Selected</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-t-sm border-b-2 bg-slate-800 border-slate-900 opacity-30"></div>
            <span className="text-sm text-gray-400">Booked</span>
          </div>
        </div>

      </div>

      {/* Floating Summary Panel */}
      <div className={`fixed bottom-0 left-0 w-full bg-slate-900/90 backdrop-blur-xl border-t border-white/10 p-6 transform transition-transform duration-500 z-50 ${selectedSeats.length > 0 ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-12">
            <div>
              <p className="text-gray-400 text-sm mb-1">Selected Seats</p>
              <div className="flex gap-2 flex-wrap max-w-md">
                {selectedSeats.map(seat => (
                  <span key={seat} className="px-3 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-md text-sm font-semibold">
                    {seat}
                  </span>
                ))}
              </div>
            </div>
            <div className="h-10 w-px bg-white/10"></div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Total Price</p>
              <p className="text-3xl font-bold text-white">${totalPrice}</p>
            </div>
          </div>
          
          <button 
            onClick={handlePayment}
            className={`flex items-center gap-2 px-10 py-4 rounded-xl font-bold transition-all duration-300 ${
              paymentSuccess 
                ? 'bg-emerald-500 text-emerald-950 scale-105 shadow-[0_0_20px_rgba(16,185,129,0.5)]'
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]'
            }`}
          >
            {paymentSuccess ? (
              <>
                <CheckCircle2 className="w-6 h-6" />
                Payment Successful!
              </>
            ) : (
              'Proceed to Payment'
            )}
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default SeatSelection;
