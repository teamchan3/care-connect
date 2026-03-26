"use client";

// import { signOut } from "@/lib/auth";
// import { useAuthStore } from "@/stores/authStore";
// import { useGlobalLoadingStore } from "@/stores/globalLoadingStore";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  // const user = useAuthStore((state) => state.user);
  // const setLoading = useGlobalLoadingStore((state) => state.setLoading);
  const { user, handleLogout } = useAuth();

  const initials = user?.email?.split('@')[0]?.slice(0, 2).toUpperCase();
  
  return (
    <header className={`bg-base-100/90`}>
      <div className={`navbar shadow-sm`}>
        <div className="flex-1">
          <button className="btn btn-ghost">介護事業書管理アプリ</button>
        </div>
        {(() => {
          if(user){
            return (
              <div className="flex gap-2">
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar avatar-placeholder">
                  <div className="bg-neutral text-neutral-content w-24 rounded-full">
                    <span className="text-xs">{initials}</span>
                  </div>
                  </div>
                  <ul
                    tabIndex={-1}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li><button onClick={handleLogout}>Logout</button></li>
                  </ul>
                </div>
              </div>
            )
          }
          return null;
        })()}
      </div>
    </header>
  );
}