import ReCAPTCHA from "react-google-recaptcha";

export default function CaptchaChallenge({ onVerify }: { onVerify: (token: string) => void }) {

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;
    //console.log(siteKey)
  return (
    <div className="p-4 border rounded shadow-lg max-w-sm mx-auto mt-10">
      <p className="text-center mb-4">Please verify you&aposre human</p>
      <ReCAPTCHA
        sitekey={siteKey}
        onChange={(token: string | null) => token && onVerify(token)}
      />
    </div>
  );
}
