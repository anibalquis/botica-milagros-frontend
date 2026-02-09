import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useUI } from "../../contexts/UIContext";
import { notifications } from "../../data/notifications";

export default function NotificationsDropdown() {
  const { notificationsOpen, toggleNotifications, closeAllDropdowns } = useUI();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        if (notificationsOpen) closeAllDropdowns();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [notificationsOpen, closeAllDropdowns]);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={toggleNotifications}
        className="flex flex-col items-center p-2 text-gray-600 hover:text-green-600 transition-colors relative"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/1827/1827392.png"
          alt="Avisos"
          className="w-6 h-6"
        />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {notifications.length}
          </span>
        )}
        <span className="text-xs mt-1">Avisos</span>
      </button>

      {/* Dropdown */}
      {notificationsOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <h4 className="font-semibold text-gray-800">Notificaciones</h4>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.map((notification) => (
              <Link
                key={notification.id}
                to={notification.link}
                onClick={closeAllDropdowns}
                className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
              >
                <p className="text-sm text-gray-700 flex-1">
                  {notification.message}
                </p>
                <button className="ml-2 px-3 py-1 bg-green-500 text-white text-xs rounded-full hover:bg-green-600 transition-colors">
                  Ver
                </button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
