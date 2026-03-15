import { useState } from "react";
import InputArea from "@/components/InputArea";
import ClassicPanel from "@/components/ClassicPanel";
import ModernPanel from "@/components/ModernPanel";
import SocialFooter from "@/components/SocialFooter";

const Index = () => {
  const [text, setText] = useState("");

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Input Area */}
      <InputArea value={text} onChange={setText} />

      {/* Split Screen */}
      <div className="flex-1 flex min-h-0 pb-10">
        {/* Classic (Left) */}
        <div className="w-1/2">
          <ClassicPanel text={text} />
        </div>

        {/* Divider */}
        <div className="w-px bg-border" />

        {/* Modern (Right) */}
        <div className="w-1/2">
          <ModernPanel text={text} />
        </div>
      </div>

      {/* Social Footer */}
      <SocialFooter
        twitterUrl="https://x.com/rakshith_twt"
        linkedinUrl="https://www.linkedin.com/in/rakshith-m-l-785447244/"
        portfolioUrl="https://rakshithml.vercel.app/"
      />
    </div>
  );
};

export default Index;
