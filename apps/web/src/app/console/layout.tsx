import Providers from "./providers";
import Toast from "./toast";

export default function ConsoleLayout({ children }) {
  return (
    <Providers>
      <Toast />
      {children}
    </Providers>
  );
}
