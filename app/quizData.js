// quizData.js
const quizData = {
    PasswordSecurity: [
      {
        question: "Which of the following is a characteristic of a strong password?",
        options: ["a) 8 characters long", "b) Contains only letters", "c) Contains a mix of letters, numbers, and special characters"],
        answer: 2,
      },
      {
        question: "What should you avoid when creating a password?",
        options: ["a) Including your name or birthdate", "b) Using special characters", "c) Using both uppercase and lowercase letters"],
        answer: 0,
      },
      {
        question: "What is the main benefit of Multi-Factor Authentication (MFA)?",
        options: ["a) It allows you to recover forgotten passwords", "b) It provides an additional layer of security beyond just a password", "c) It makes your password longer"],
        answer: 1,
      },
    ],
    PhishingAwareness: [
      {
        question: "Which of the following is a sign of a phishing email?",
        options: ["a) Spelling mistakes and suspicious attachments", "b) The email contains your name", "c) It is from your manager"],
        answer: 0,
      },
      {
        question: "Phishing via SMS is called:",
        options: ["a) Spear phishing", "b) Smishing", "c) Vishing"],
        answer: 1,
      },
      {
        question: "If you suspect a phishing email, what should you do first?",
        options: ["a) Click the link to verify if it’s legitimate", "b) Report it to your IT department", "c) Reply asking for more information"],
        answer: 1,
      },
    ],
    SafeInternet: [
      {
        question: "What should you look for to ensure a website is secure?",
        options: ["a) HTTP in the URL", "b) HTTPS in the URL", "c) Any website will do"],
        answer: 1,
      },
      {
        question: "What should you do before opening an email attachment from an unknown sender?",
        options: ["a) Open it immediately", "b) Verify the sender first", "c) Ignore the email"],
        answer: 1,
      },
      {
        question: "Which of the following is the safest way to browse the internet on public Wi-Fi?",
        options: ["a) Avoid public Wi-Fi altogether", "b) Use a VPN to encrypt your data", "c) Connect to the network without any precautions"],
        answer: 1,
      },
    ],
    DataPrivacy: [
      {
        question: "Which of the following is a good practice for protecting personal data?",
        options: ["a) Sharing sensitive data on social media", "b) Encrypting sensitive information", "c) Giving everyone access to all data"],
        answer: 1,
      },
      {
        question: "Which regulation governs data protection in Europe?",
        options: ["a) GDPR", "b) DMCA", "c) HIPAA"],
        answer: 0,
      },
      {
        question: "What is one way to protect company data?",
        options: ["a) Store all data on unencrypted USB drives", "b) Limit access to data based on job roles", "c) Share passwords among colleagues"],
        answer: 1,
      },
    ],
    DeviceNetwork: [
      {
        question: "Which of the following should be done to keep your devices secure?",
        options: ["a) Disable antivirus software", "b) Keep software and firmware updated", "c) Use outdated versions of software"],
        answer: 1,
      },
      {
        question: "What is the safest type of Wi-Fi connection to use?",
        options: ["a) Open public Wi-Fi", "b) Secure password-protected Wi-Fi", "c) Any connection with strong signals"],
        answer: 1,
      },
      {
        question: "What should you do if you detect unusual network behavior?",
        options: ["a) Ignore it", "b) Report it immediately", "c) Investigate it yourself"],
        answer: 1,
      },
    ],
  };
  
  export default quizData;
  