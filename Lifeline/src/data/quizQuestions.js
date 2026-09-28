//Question bank
export const QUIZ_QUESTIONS = [
  // General SG emergency knowledge
  {
    id: "sg-ambulance",
    type: "mc",
    category: "Singapore",
    prompt:
      "Which number do you call for an ambulance or fire emergency in Singapore?",
    options: ["999", "995", "1777", "112"],
    answer: 1,
    explanation:
      "995 reaches SCDF for fire and medical emergencies. 999 is the police.",
  },
  {
    id: "sg-nonemergency",
    type: "mc",
    category: "Singapore",
    prompt:
      "You need an ambulance for a non-urgent hospital transfer. Which number is appropriate?",
    options: ["995", "1777", "999", "993"],
    answer: 1,
    explanation:
      "1777 is the non-emergency ambulance line. Using 995 for non-urgent cases ties up crews needed for life-threatening calls.",
  },
  {
    id: "sg-myresponder",
    type: "tf",
    category: "Singapore",
    prompt:
      "The SCDF myResponder app can alert nearby volunteers to a cardiac arrest before the ambulance arrives.",
    options: ["True", "False"],
    answer: 0,
    explanation:
      "myResponder notifies registered community first responders nearby, because bystander CPR in the first minutes strongly affects survival.",
  },
  {
    id: "sg-aed",
    type: "tf",
    category: "Singapore",
    prompt:
      "AEDs in HDB blocks are locked and can only be opened by trained staff.",
    options: ["True", "False"],
    answer: 1,
    explanation:
      "Public AEDs are meant for anyone to use. They give spoken instructions and will not deliver a shock unless one is needed.",
  },
  {
    id: "sg-haze",
    type: "mc",
    category: "Singapore",
    prompt:
      "During severe haze, which mask actually filters the fine particles that matter?",
    options: [
      "Surgical mask",
      "Cloth mask",
      "N95 respirator",
      "Any mask worn tightly",
    ],
    answer: 2,
    explanation:
      "N95 respirators filter fine PM2.5 particles. Surgical and cloth masks do not seal well enough to protect against haze.",
  },
  {
    id: "sg-psi",
    type: "tf",
    category: "Singapore",
    prompt: "A 24-hour PSI reading above 100 is considered unhealthy.",
    options: ["True", "False"],
    answer: 0,
    explanation:
      "NEA bands PSI 101–200 as unhealthy, 201–300 as very unhealthy, and above 300 as hazardous.",
  },
  {
    id: "sg-flood",
    type: "mc",
    category: "Singapore",
    prompt:
      "A flash flood has made the underpass ahead knee-deep. What should you do?",
    options: [
      "Walk through quickly before it rises",
      "Turn back and find another route",
      "Wait at the edge until the water drops",
      "Drive through slowly in low gear",
    ],
    answer: 1,
    explanation:
      "Moving water only ankle to knee deep can knock an adult over, and you cannot see hazards or open drains beneath it.",
  },
  {
    id: "sg-hdb-fire",
    type: "mc",
    category: "Singapore",
    prompt:
      "A fire starts in the corridor outside your HDB flat and the smoke is thick. What is the safer action?",
    options: [
      "Run through the smoke to the lift",
      "Stay inside, seal gaps under the door, and call 995",
      "Open all windows and wait on the balcony",
      "Use the rubbish chute area as shelter",
    ],
    answer: 1,
    explanation:
      "If the escape route is blocked by smoke, staying put with the door sealed and calling for help is safer. Never use a lift in a fire.",
  },
  {
    id: "sg-shelter",
    type: "tf",
    category: "Singapore",
    prompt:
      "Many HDB flats built after 1997 include a household shelter designed to be used as a refuge.",
    options: ["True", "False"],
    answer: 0,
    explanation:
      "Household shelters are reinforced rooms. Keeping them clear rather than packed with storage means they can be used as intended.",
  },
  {
    id: "sg-dengue",
    type: "mc",
    category: "Singapore",
    prompt: "Which is the most effective everyday step against dengue at home?",
    options: [
      "Spraying insecticide daily",
      "Removing stagnant water from containers weekly",
      "Keeping windows shut at all times",
      "Using scented candles outdoors",
    ],
    answer: 1,
    explanation:
      "Aedes mosquitoes breed in small pools of stagnant water, so removing breeding sites is more effective than killing adult mosquitoes.",
  },

  // First aid
  {
    id: "fa-bleeding",
    type: "mc",
    category: "First aid",
    prompt:
      "Someone has a deep cut to the forearm that is bleeding heavily. What do you do first?",
    options: [
      "Apply a tourniquet above the elbow",
      "Rinse the wound thoroughly with water",
      "Press firmly and directly on the wound",
      "Raise the arm and wait",
    ],
    answer: 2,
    explanation:
      "Firm direct pressure controls most external bleeding. A tourniquet is for catastrophic limb bleeding that pressure cannot stop.",
  },
  {
    id: "fa-dressing",
    type: "tf",
    category: "First aid",
    prompt:
      "If blood soaks through a dressing, you should remove it and apply a clean one.",
    options: ["True", "False"],
    answer: 1,
    explanation:
      "Lifting the dressing disturbs the clot that is forming. Add another layer on top and keep pressing.",
  },
  {
    id: "fa-cpr-rate",
    type: "mc",
    category: "First aid",
    prompt: "What is the recommended rate for chest compressions in adult CPR?",
    options: [
      "60–80 per minute",
      "100–120 per minute",
      "140–160 per minute",
      "As fast as possible",
    ],
    answer: 1,
    explanation:
      "Around 100–120 compressions per minute, pressing at least 5 cm deep and allowing the chest to recoil fully between compressions.",
  },
  {
    id: "fa-recovery",
    type: "mc",
    category: "First aid",
    prompt:
      "An unresponsive adult is breathing normally. What position should they be placed in?",
    options: [
      "Flat on their back",
      "On their side in the recovery position",
      "Sitting upright",
      "Face down",
    ],
    answer: 1,
    explanation:
      "The recovery position keeps the airway open and lets fluid drain, reducing the risk of choking on vomit.",
  },
  {
    id: "fa-choking",
    type: "mc",
    category: "First aid",
    prompt:
      "An adult is choking but can still cough forcefully. What should you do?",
    options: [
      "Start abdominal thrusts immediately",
      "Encourage them to keep coughing",
      "Give five back blows straight away",
      "Offer them water to wash it down",
    ],
    answer: 1,
    explanation:
      "An effective cough moves more air than any technique you can apply. Intervene when the cough becomes weak or silent.",
  },
  {
    id: "fa-burns",
    type: "mc",
    category: "First aid",
    prompt: "How should a scald from boiling water be treated first?",
    options: [
      "Apply ice directly to the skin",
      "Cool under running water for about 20 minutes",
      "Cover with toothpaste or butter",
      "Burst any blisters that form",
    ],
    answer: 1,
    explanation:
      "Cool running water limits how deep the burn goes. Ice damages tissue, and creams or food trap heat and cause infection.",
  },
  {
    id: "fa-heatstroke",
    type: "tf",
    category: "First aid",
    prompt:
      "Someone with heat stroke who has stopped sweating is less seriously affected than someone sweating heavily.",
    options: ["True", "False"],
    answer: 1,
    explanation:
      "Hot, dry skin with confusion is a sign of heat stroke, a medical emergency. Call 995 and cool them aggressively.",
  },
  {
    id: "fa-seizure",
    type: "mc",
    category: "First aid",
    prompt: "Someone is having a seizure on the pavement. What should you do?",
    options: [
      "Hold their limbs still",
      "Put something in their mouth",
      "Clear the space around them and time the seizure",
      "Lift them to a bench",
    ],
    answer: 2,
    explanation:
      "Protect them from injury and time it. Never restrain someone or put anything in their mouth. Call 995 if it lasts over five minutes.",
  },
  {
    id: "fa-spinal",
    type: "tf",
    category: "First aid",
    prompt:
      "After a motorcycle accident, you should remove the rider's helmet so they can breathe more easily.",
    options: ["True", "False"],
    answer: 1,
    explanation:
      "Removing a helmet can move the neck and worsen a spinal injury. Leave it unless the airway is blocked and you cannot manage it otherwise.",
  },
  {
    id: "fa-shock",
    type: "mc",
    category: "First aid",
    prompt: "Which set of signs suggests someone is going into shock?",
    options: [
      "Flushed face, slow pulse, warm hands",
      "Pale clammy skin, fast weak pulse, confusion",
      "Slow breathing and strong pulse",
      "Dry mouth and mild headache only",
    ],
    answer: 1,
    explanation:
      "Shock means the body is not circulating enough blood. Call 995, lay them flat, keep them warm, and do not give food or drink.",
  },
  {
    id: "fa-allergy",
    type: "tf",
    category: "First aid",
    prompt: "An adrenaline auto-injector should be given into the outer thigh.",
    options: ["True", "False"],
    answer: 0,
    explanation:
      "The outer thigh muscle absorbs it fastest, and it can be given through clothing. Call 995 immediately afterwards.",
  },

  // Preparedness
  {
    id: "prep-gobag",
    type: "mc",
    category: "Preparedness",
    prompt: "Which item is most often forgotten from an emergency go-bag?",
    options: [
      "A torch",
      "Regular prescription medication",
      "Bottled water",
      "A phone charger",
    ],
    answer: 1,
    explanation:
      "People pack the obvious items but forget medication, which is the hardest thing to replace quickly in a disruption.",
  },
  {
    id: "prep-text",
    type: "tf",
    category: "Preparedness",
    prompt:
      "During a major incident, a text message is more likely to get through than a voice call.",
    options: ["True", "False"],
    answer: 0,
    explanation:
      "Texts need far less bandwidth and will queue and retry, so they often succeed when networks are congested.",
  },
  {
    id: "prep-meetup",
    type: "mc",
    category: "Preparedness",
    prompt: "Why should a household agree on a meeting point in advance?",
    options: [
      "It is required by law",
      "Phone networks may be down or congested",
      "It reduces the cost of emergency services",
      "It replaces the need to call for help",
    ],
    answer: 1,
    explanation:
      "A pre-agreed place means you can regroup without needing to coordinate by phone at the worst possible moment.",
  },
  {
    id: "prep-documents",
    type: "tf",
    category: "Preparedness",
    prompt:
      "Storing photos of your passport and insurance only in the cloud is enough when travelling.",
    options: ["True", "False"],
    answer: 1,
    explanation:
      "You may have no data or a dead battery when you need them. Keep an offline copy on your phone and a paper copy separately.",
  },
  {
    id: "prep-passport",
    type: "mc",
    category: "Preparedness",
    prompt:
      "Your passport is stolen abroad. What is the correct order of actions?",
    options: [
      "Contact your embassy, then file a police report",
      "File a police report, then contact your embassy",
      "Book a new flight home first",
      "Wait until you reach the airport",
    ],
    answer: 1,
    explanation:
      "Embassies generally require a police report before issuing an emergency travel document, so file it first.",
  },
  {
    id: "prep-torch",
    type: "tf",
    category: "Preparedness",
    prompt:
      "Candles are a safe light source during a power outage as long as they are supervised.",
    options: ["True", "False"],
    answer: 1,
    explanation:
      "Open flames are a leading cause of fires during outages. A torch or phone light is safer, which is why power banks matter.",
  },
  {
    id: "prep-fridge",
    type: "mc",
    category: "Preparedness",
    prompt:
      "The power is out. What is the best way to keep food safe for longest?",
    options: [
      "Open the fridge only to check the temperature",
      "Keep the fridge and freezer doors shut",
      "Move everything to the freezer",
      "Cook everything immediately",
    ],
    answer: 1,
    explanation:
      "An unopened fridge stays cold for several hours and a full freezer far longer. Every opening wastes cold air.",
  },
  {
    id: "prep-lift",
    type: "tf",
    category: "Preparedness",
    prompt:
      "If you are trapped in a lift during a power failure, you should try to force the doors open and climb out.",
    options: ["True", "False"],
    answer: 1,
    explanation:
      "Climbing out of a stalled lift is how people get seriously injured. Use the alarm or intercom and wait for rescue.",
  },
  {
    id: "prep-112",
    type: "tf",
    category: "Preparedness",
    prompt:
      "112 works as an emergency number in many countries even when your phone has no SIM or no network of its own.",
    options: ["True", "False"],
    answer: 0,
    explanation:
      "112 is the standard GSM emergency number and can connect via any available network, which makes it useful when travelling.",
  },
  {
    id: "prep-insurance",
    type: "mc",
    category: "Preparedness",
    prompt:
      "Which detail is most useful to have saved before a medical emergency abroad?",
    options: [
      "Your hotel booking reference",
      "Your insurer's 24-hour assistance number",
      "A list of nearby restaurants",
      "Your flight seat number",
    ],
    answer: 1,
    explanation:
      "The assistance line arranges treatment, guarantees payment and handles evacuation, so it is the number to call first.",
  },
];
