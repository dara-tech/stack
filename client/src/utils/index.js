import { toast } from "sonner";

export function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();

}

export const saveUserInfo = (user, signIn) => {
  if (user && user.token) {
    localStorage.setItem("userInfo", JSON.stringify({ user: user?.user, token: user.token }));
    signIn({ user: user?.user, token: user.token });
    if (user.success) {
      toast.success("Signin successful!");
    }
    setTimeout(() => {
      window.history.back();
    }, 1500);
  } else {
    console.error("Invalid user data received:", user);
    if (user && user.message) {
      toast.error(user.message);
    } else {
      toast.error("Invalid user data received. Please try again.");
    }
  }
};
