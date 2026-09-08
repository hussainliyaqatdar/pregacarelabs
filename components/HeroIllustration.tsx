export default function HeroIllustration() {
  return (
    <svg
      viewBox="15 25 610 440"
      className="w-full h-auto"
      role="img"
      aria-label="Illustration of a phlebotomist visiting a pregnant woman at home to collect a blood sample using a professional collection kit"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Home sample collection illustration</title>

      {/* backdrop */}
      <ellipse cx="320" cy="470" rx="260" ry="26" fill="#0A4F4F" opacity="0.08" />
      <circle cx="480" cy="120" r="90" fill="#FF7A45" opacity="0.08" />
      <path d="M0 460 C 120 420, 520 420, 640 460 L640 520 L0 520 Z" fill="#E8F5F3" />

      {/* window, suggesting indoors */}
      <rect x="40" y="60" width="90" height="110" rx="10" fill="#FFFFFF" stroke="#D8ECE9" strokeWidth="4" />
      <line x1="85" y1="60" x2="85" y2="170" stroke="#D8ECE9" strokeWidth="4" />
      <line x1="40" y1="115" x2="130" y2="115" stroke="#D8ECE9" strokeWidth="4" />

      {/* potted plant */}
      <path d="M540 300 q-30 -10 -34 -46 q30 -6 40 20 Z" fill="#0F6E6E" opacity="0.85" />
      <path d="M550 296 q26 -18 20 -50 q-30 2 -30 32 Z" fill="#0F6E6E" opacity="0.7" />
      <rect x="536" y="296" width="30" height="34" rx="4" fill="#0A4F4F" />

      {/* chair */}
      <rect x="330" y="230" width="150" height="150" rx="18" fill="#0F6E6E" />
      <rect x="316" y="360" width="178" height="26" rx="10" fill="#0A4F4F" />
      <rect x="326" y="200" width="30" height="150" rx="14" fill="#0A4F4F" />

      {/* patient, seated - pregnant */}
      <g>
        {/* legs */}
        <rect x="360" y="364" width="34" height="76" rx="16" fill="#33475B" />
        <rect x="410" y="364" width="34" height="76" rx="16" fill="#33475B" />
        <ellipse cx="377" cy="444" rx="20" ry="10" fill="#1F2D3A" />
        <ellipse cx="427" cy="444" rx="20" ry="10" fill="#1F2D3A" />

        {/* torso + belly, single soft silhouette */}
        <path
          d="M362 278
             C 344 280, 332 300, 330 322
             C 328 350, 336 384, 366 398
             L 446 398
             C 470 388, 474 356, 466 328
             C 460 304, 448 284, 428 278
             C 408 270, 382 270, 362 278 Z"
          fill="#3B6E8F"
        />
        <ellipse cx="358" cy="340" rx="16" ry="11" fill="#4A7EA0" opacity="0.3" />

        {/* far arm resting on belly */}
        <g transform="rotate(24 444 300)">
          <rect x="394" y="290" width="56" height="22" rx="11" fill="#3B6E8F" />
          <circle cx="398" cy="301" r="14" fill="#E7B896" />
        </g>
        <circle cx="444" cy="300" r="14" fill="#3B6E8F" />

        {/* near arm extended toward phlebotomist, sleeve rolled */}
        <g transform="rotate(-6 366 300)">
          <rect x="256" y="289" width="112" height="24" rx="12" fill="#3B6E8F" />
          <rect x="256" y="291" width="46" height="20" rx="10" fill="#E7B896" />
          <circle cx="262" cy="301" r="13" fill="#E7B896" />
        </g>
        <circle cx="366" cy="300" r="14" fill="#3B6E8F" />

        {/* neck */}
        <rect x="392" y="256" width="28" height="26" rx="11" fill="#E7B896" />

        {/* head */}
        <circle cx="406" cy="232" r="31" fill="#E7B896" />
        <ellipse cx="406" cy="211" rx="28" ry="16" fill="#33241C" />
        <circle cx="429" cy="219" r="10" fill="#33241C" />
      </g>

      {/* phlebotomist kneeling beside chair */}
      <g>
        {/* kit box */}
        <rect x="150" y="380" width="64" height="46" rx="8" fill="#0F6E6E" />
        <rect x="176" y="368" width="12" height="18" rx="3" fill="#0F6E6E" />
        <rect x="168" y="396" width="28" height="8" rx="3" fill="#FF7A45" />
        <rect x="178" y="386" width="8" height="28" rx="3" fill="#FF7A45" />

        {/* sample tube tray beside the kit */}
        <rect x="106" y="408" width="46" height="12" rx="3" fill="#D8ECE9" />
        <rect x="112" y="386" width="8" height="24" rx="3" fill="#F3F6F5" stroke="#0A4F4F" strokeWidth="1.5" />
        <rect x="112" y="384" width="8" height="6" rx="2" fill="#FF7A45" />
        <rect x="124" y="390" width="8" height="20" rx="3" fill="#F3F6F5" stroke="#0A4F4F" strokeWidth="1.5" />
        <rect x="124" y="388" width="8" height="6" rx="2" fill="#0A4F4F" />
        <rect x="136" y="394" width="8" height="16" rx="3" fill="#F3F6F5" stroke="#0A4F4F" strokeWidth="1.5" />
        <rect x="136" y="392" width="8" height="6" rx="2" fill="#FF7A45" />

        {/* legs, kneeling */}
        <rect x="200" y="380" width="30" height="60" rx="14" fill="#324B5E" />
        <ellipse cx="215" cy="440" rx="30" ry="14" fill="#243444" />
        <rect x="255" y="392" width="34" height="52" rx="16" fill="#324B5E" transform="rotate(6 255 392)" />
        <ellipse cx="290" cy="440" rx="20" ry="11" fill="#243444" />

        {/* torso / coat */}
        <path d="M195 300 q0 -30 35 -30 h40 q35 0 35 30 v70 q0 20 -18 20 h-74 q-18 0 -18 -20 Z" fill="#FFFFFF" stroke="#D8ECE9" strokeWidth="3" />
        <path d="M232 272 l14 22 l14 -22" fill="none" stroke="#0F6E6E" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />

        {/* ID badge */}
        <line x1="246" y1="292" x2="246" y2="320" stroke="#0A4F4F" strokeWidth="3" />
        <rect x="234" y="318" width="24" height="30" rx="4" fill="#FF7A45" />

        {/* reaching arm to patient's arm, gloved hand holding vial - single pivot */}
        <g transform="rotate(-8 262 306)">
          <rect x="262" y="296" width="86" height="22" rx="11" fill="#FFFFFF" stroke="#D8ECE9" strokeWidth="3" />
          <circle cx="340" cy="307" r="13" fill="#F3F6F5" stroke="#D8ECE9" strokeWidth="2" />
          <rect x="322" y="278" width="10" height="26" rx="4" fill="#FF7A45" />
          <rect x="325" y="272" width="6" height="8" rx="2" fill="#0A4F4F" />
        </g>
        <circle cx="262" cy="306" r="13" fill="#FFFFFF" stroke="#D8ECE9" strokeWidth="3" />

        {/* neck */}
        <rect x="230" y="270" width="26" height="24" rx="10" fill="#C88A5C" />

        {/* head */}
        <circle cx="243" cy="250" r="30" fill="#C88A5C" />
        <ellipse cx="243" cy="230" rx="27" ry="15" fill="#1E1512" />
      </g>

      {/* small floating care icons */}
      <circle cx="120" cy="120" r="6" fill="#FF7A45" opacity="0.6" />
      <circle cx="150" cy="90" r="4" fill="#0F6E6E" opacity="0.5" />
      <path d="M560 200 l6 10 h-12 Z" fill="#0F6E6E" opacity="0.3" />
    </svg>
  );
}
