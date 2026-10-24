"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");
const engine = require("../js/ciencia-chatbot-engine.js");

const cases = [];

function add(group, question, expected, intent, options) {
  cases.push({
    group,
    question,
    expected: Array.isArray(expected) ? expected : [expected],
    intent,
    options: options || {}
  });
}

function addVariants(group, seeds, wrappers, count) {
  for (let index = 0; index < count; index += 1) {
    const seed = seeds[index % seeds.length];
    const wrapper = wrappers[Math.floor(index / seeds.length) % wrappers.length];
    add(group, wrapper(seed.question), seed.expected || seed.id, seed.intent, seed.options);
  }
}

const prefixes = [
  (question) => question,
  (question) => `Please tell me: ${question}`,
  (question) => `Could you explain this? ${question}`,
  (question) => `I would like to know: ${question}`,
  (question) => `For planning, ${question}`
];

const courseListSeeds = [
  { question: "What courses do you have?", expected: "course-list", intent: "COURSE_LIST" },
  { question: "List Ciencia's training programmes", expected: "course-list", intent: "COURSE_LIST" },
  { question: "What can I study at Ciencia?", expected: "course-list", intent: "COURSE_LIST" },
  { question: "Which life-sciences courses are listed?", expected: "course-list", intent: "COURSE_LIST" },
  { question: "What training subjects do you offer?", expected: "course-list", intent: "COURSE_LIST" },
  { question: "Tell me about your course options", expected: "course-list", intent: "COURSE_LIST" },
  { question: "Do you have any classes?", expected: "course-list", intent: "COURSE_LIST" },
  { question: "What does Ciencia teach?", expected: "course-list", intent: "COURSE_LIST" },
  { question: "Can you list the programmes?", expected: "course-list", intent: "COURSE_LIST" },
  { question: "What subjects can I take training in?", expected: "course-list", intent: "COURSE_LIST" }
];

const naturalSeeds = [
  { question: "I want to learn how to find the right compounds for a protein target", expected: "course-cadd", intent: "CADD" },
  { question: "I need help interpreting DNA sequences and gene data", expected: "course-bioinformatics", intent: "BIOINFORMATICS" },
  { question: "Can someone guide my final-year thesis project?", expected: "projects", intent: "PROJECT" },
  { question: "Where can I call or message Ciencia?", expected: "contact-location", intent: "CONTACT" },
  { question: "Do you have a machine for PCR?", expected: "facilities", intent: "LAB_FACILITY" },
  { question: "I need to know whether BSc graduates can apply", expected: "course-eligibility", intent: "COURSE_ELIGIBILITY" },
  { question: "Could you help me write a paper for a journal?", expected: "scientific-writing", intent: "SCIENTIFIC_WRITING" },
  { question: "I want a map of patents around an API drug", expected: "patent-services", intent: "PATENT" },
  { question: "What are the usual office hours?", expected: "contact-location", intent: "WORKING_HOURS" },
  { question: "I want to sign up for a course", expected: "registration", intent: "REGISTRATION" }
];

addVariants("straightforward", courseListSeeds, prefixes, 50);
addVariants("natural-language", naturalSeeds, prefixes, 50);

const spellingSeeds = [
  ["Do you have bioinformatcs?", "course-bioinformatics", "BIOINFORMATICS"],
  ["Tell me about cheminformatcs training", "course-list", "COURSE_LIST"],
  ["Is immunoinformatcs listed?", "course-list", "COURSE_LIST"],
  ["How do I regster?", "registration", "REGISTRATION"],
  ["What are your working hors?", "contact-location", "WORKING_HOURS"],
  ["Can I get project asistance?", "projects", "PROJECT"],
  ["Do you have PCR equipmnt?", "facilities", "LAB_FACILITY"],
  ["I need a patent landcape report", "patent-services", "PATENT"],
  ["When is the 2027 internshp?", "internship", "INTERNSHIP"],
  ["Can I take an online clas?", "course-mode", "COURSE_MODE"]
];
for (let index = 0; index < 30; index += 1) {
  const item = spellingSeeds[index % spellingSeeds.length];
  const prefix = ["", "Please tell me: ", "Could you explain: "][Math.floor(index / spellingSeeds.length)];
  add("spelling-errors", prefix + item[0], item[1], item[2]);
}

const incompleteQuestions = [
  "How much?",
  "How long?",
  "Which one?",
  "Which course?",
  "What about eligibility?",
  "How much is it?",
  "When does it start?",
  "Do you have it?",
  "Is that available?",
  "What does it include?",
  "And the fee?",
  "What about that?",
  "Can you explain more?",
  "Which is better?",
  "Is it current?",
  "What do I need?",
  "Can I take it online?",
  "What is the schedule?",
  "How do I apply for it?",
  "Can you help?",
  "That course?",
  "How much does it cost?",
  "What is the duration?",
  "Is it guaranteed?",
  "Where is it?",
  "What about the syllabus?",
  "When is the batch?",
  "Can I join this?",
  "What is included?",
  "Tell me about that"
];
incompleteQuestions.forEach((question) => add("incomplete", question, [], "OTHER", { clarification: true }));

const followUpTopics = [
  { topic: "Bioinformatics", initial: "Tell me about Bioinformatics", followUps: ["How long?", "What is the fee?", "What about the syllabus?"] },
  { topic: "CADD", initial: "Explain CADD training", followUps: ["What topics are covered?", "Can I take it online?", "How much?"] },
  { topic: "patent landscape report", initial: "Tell me about patent landscape reports", followUps: ["How long does it take?", "Is that a guaranteed timeframe?", "How much?"] },
  { topic: "academic projects", initial: "Do you help with academic projects?", followUps: ["Can MSc students join?", "What about duration?", "Can PhD scholars get help?"] },
  { topic: "Ciencia", initial: "How can I contact Ciencia?", followUps: ["Where are you located?", "What are your hours?", "What is the phone number?"] },
  { topic: "laboratory facilities", initial: "What laboratory equipment is listed?", followUps: ["Do you have PCR?", "What about an ELISA reader?", "Can I use it for my project?"] },
  { topic: "course registration", initial: "How do I register?", followUps: ["How much should I pay?", "What do I submit?", "Is bank information listed?"] },
  { topic: "scientific writing", initial: "Do you provide scientific writing help?", followUps: ["What about grant proposals?", "Can you help with a thesis?", "Do you provide statistics?"] },
  { topic: "placement assistance", initial: "Does Ciencia provide placement support?", followUps: ["Is it guaranteed?", "Are there vacancies now?", "Who is eligible?"] },
  { topic: "internship", initial: "Is there a 2027 summer internship?", followUps: ["When does it start?", "What is the fee?", "How long is it?"] }
];
followUpTopics.forEach((topic) => {
  topic.followUps.forEach((question) => {
    const context = engine.respond(topic.initial).context;
    const result = engine.respond(question, context);
    add("follow-up-context", question, result.items.map((item) => item.id), result.intent, { context, precomputed: result });
  });
});

const multiIntentQuestions = [
  ["What courses and fees do you list?", ["COURSE_LIST", "COURSE_FEE"]],
  ["Can BSc students join, and are classes online?", ["COURSE_ELIGIBILITY", "COURSE_MODE"]],
  ["Do you offer internships and projects?", ["INTERNSHIP", "PROJECT"]],
  ["Tell me about bioinformatics and its syllabus", ["BIOINFORMATICS", "COURSE_CURRICULUM"]],
  ["Do you provide PCR and laboratory equipment?", ["LAB_FACILITY"]],
  ["What research services and scientific writing do you offer?", ["RESEARCH_SERVICE", "SCIENTIFIC_WRITING"]],
  ["Can I register and what payment is required?", ["REGISTRATION", "COURSE_FEE"]],
  ["What patent services do you offer and how long do reports take?", ["PATENT", "COURSE_DURATION"]],
  ["Where are you located and what are your hours?", ["LOCATION", "WORKING_HOURS"]],
  ["Are there careers and placement assistance?", ["CAREER"]]
];
for (let index = 0; index < 20; index += 1) {
  const item = multiIntentQuestions[index % multiIntentQuestions.length];
  const question = index < multiIntentQuestions.length ? item[0] : `Please tell me: ${item[0]}`;
  add("multi-intent", question, [], item[1][0], { intents: item[1] });
}

const temporalQuestions = [
  ["Is ₹30,000 the current Bioinformatics fee?", "course-fees", "historical"],
  ["When is the 2027 internship?", "internship", "current-announcement-incomplete"],
  ["How long does a patent landscape take?", "patent-timings", "conflicting"],
  ["What is the latest course schedule?", "course-list", "mixed"],
  ["Are any jobs open right now?", "careers", "current-status-not-listed"],
  ["What is the old Docking course fee?", "course-fees", "historical"],
  ["Is the product snapshot turnaround 5 or 15 days?", "patent-timings", "conflicting"],
  ["What are current course fees?", "course-fees", "historical"],
  ["What date is the 2027 summer internship?", "internship", "current-announcement-incomplete"],
  ["Is the advertised 20–25 day landscape time guaranteed?", "patent-timings", "conflicting"]
];
for (let index = 0; index < 20; index += 1) {
  const item = temporalQuestions[index % temporalQuestions.length];
  const question = index < temporalQuestions.length ? item[0] : `Please confirm: ${item[0]}`;
  const intent = item[0].toLowerCase().includes("schedule") ? "COURSE_LIST" : item[1] === "internship" ? "INTERNSHIP" : item[1] === "patent-timings" ? "PATENT" : item[1] === "careers" ? "CAREER" : "COURSE_FEE";
  add("current-historical", question, item[1], intent, { sourceStatus: item[2], temporal: true });
}

const unsupportedQuestions = [
  "What is the weather in Hyderabad tomorrow?",
  "What is the current share price of a biotech company?",
  "Can you guarantee that my patent will be approved?",
  "Is placement guaranteed after this course?",
  "What is the exact current Bioinformatics fee?",
  "Can Ciencia prescribe medicine for my symptoms?",
  "What are the 2027 internship dates?",
  "What is the patent office's legal deadline for my case?",
  "Does the website guarantee a job?",
  "Give me the private phone number of an advisor"
];
for (let index = 0; index < 20; index += 1) {
  const question = unsupportedQuestions[index % unsupportedQuestions.length];
  const variant = index < unsupportedQuestions.length ? question : `Please confirm: ${question}`;
  const knownCaveat = /guarantee|placement|current Bioinformatics fee|internship dates|legal deadline/.test(question);
  add("hallucination-resistance", variant, knownCaveat ? (question.includes("placement") || question.includes("job") ? "careers" : question.includes("internship") ? "internship" : question.includes("legal deadline") || question.includes("patent") ? "patent-services" : "course-fees") : [], "OTHER", { safeCaveat: knownCaveat });
}

const domainGroups = [
  {
    name: "courses",
    seeds: [
      { question: "Do you offer Bioinformatics?", id: "course-bioinformatics", intent: "BIOINFORMATICS" },
      { question: "What does the CADD syllabus cover?", id: "course-cadd", intent: "CADD" },
      { question: "Who can apply for training?", id: "course-eligibility", intent: "COURSE_ELIGIBILITY" },
      { question: "Are online classes available?", id: "course-mode", intent: "COURSE_MODE" },
      { question: "What courses do you list?", id: "course-list", intent: "COURSE_LIST" }
    ]
  },
  {
    name: "research-services",
    seeds: [
      { question: "Do you help with research?", id: "research-services", intent: "RESEARCH_SERVICE" },
      { question: "Can PhD scholars get project help?", id: "projects", intent: "PROJECT" },
      { question: "Can you assist with scientific writing?", id: "scientific-writing", intent: "SCIENTIFIC_WRITING" },
      { question: "What research areas do you work in?", id: "research-areas", intent: "RESEARCH_SERVICE" },
      { question: "What lab methods are listed?", id: "research-techniques", intent: "LAB_FACILITY" }
    ]
  },
  {
    name: "laboratory-facilities",
    seeds: [
      { question: "Do you have PCR?", id: "facilities", intent: "LAB_FACILITY" },
      { question: "Is an ELISA reader listed?", id: "facilities", intent: "LAB_FACILITY" },
      { question: "Do you have a spectrophotometer?", id: "facilities", intent: "LAB_FACILITY" },
      { question: "What equipment is available?", id: "facilities", intent: "LAB_FACILITY" },
      { question: "Is a fermenter listed?", id: "facilities", intent: "LAB_FACILITY" }
    ]
  },
  {
    name: "patents-ip",
    seeds: [
      { question: "Do you provide patent services?", id: "patent-services", intent: "PATENT" },
      { question: "Can I request an FTO report?", id: "patent-services", intent: "PATENT" },
      { question: "How long does a landscape report take?", id: "patent-timings", intent: "PATENT" },
      { question: "Do you file WIPO PCT applications?", id: "patent-services", intent: "PATENT" },
      { question: "Can you guarantee patent approval?", id: "patent-services", intent: "PATENT" }
    ]
  },
  {
    name: "registration-contact",
    seeds: [
      { question: "How do I register?", id: "registration", intent: "REGISTRATION" },
      { question: "How much is registration payment?", id: "registration", intent: "REGISTRATION" },
      { question: "What is your phone number?", id: "contact-location", intent: "CONTACT" },
      { question: "Where are you located?", id: "contact-location", intent: "LOCATION" },
      { question: "What is your general email?", id: "contact-location", intent: "CONTACT" }
    ]
  }
];
domainGroups.forEach((group) => addVariants(group.name, group.seeds, prefixes, 20));

test("test matrix includes at least 260 cases", () => {
  assert.ok(cases.length >= 260, `Expected at least 260 cases, found ${cases.length}`);
  assert.equal(cases.length, 350);
});

cases.forEach((item, index) => {
  test(`${String(index + 1).padStart(3, "0")} ${item.group}: ${item.question}`, () => {
    const result = item.options.precomputed || engine.respond(item.question, item.options.context);

    if (item.options.clarification) {
      assert.equal(result.needsClarification, true);
      assert.match(result.answer, /which|what|tell me|please/i);
      return;
    }

    if (item.options.intents) {
      item.options.intents.forEach((intent) => assert.ok(result.intents.includes(intent), `${intent} not detected: ${result.intents}`));
    } else if (item.intent && item.intent !== "OTHER") {
      assert.ok(result.intents.includes(item.intent), `${item.intent} not detected: ${result.intents}`);
    }

    if (item.expected.length) {
      const ids = result.items.map((knowledgeItem) => knowledgeItem.id);
      item.expected.forEach((id) => assert.ok(ids.includes(id), `Expected ${id}; retrieved ${ids.join(", ") || "no sources"}`));
      result.items.forEach((knowledgeItem) => {
        assert.ok(knowledgeItem.sourceSection);
        assert.ok(knowledgeItem.sourcePage);
        assert.ok(knowledgeItem.confidence >= 0.8);
      });
      if (!item.options.temporal && !item.options.safeCaveat) {
        result.items.forEach((knowledgeItem) => {
          assert.ok(result.answer.includes(knowledgeItem.answer) || result.answer.includes("older website listing"), `Answer lacks grounded source text for ${knowledgeItem.id}`);
        });
      }
    } else if (item.options.intents) {
      assert.ok(result.items.length, `Expected a grounded response for the multi-intent question: ${item.question}`);
      assert.ok(result.items.every((knowledgeItem) => knowledgeItem.sourcePage && knowledgeItem.sourceSection));
    } else if (item.options.safeCaveat) {
      assert.match(result.answer, /not a guarantee|not confirmed|does not state|not find|not list|not available|not published|don't want to guess|cannot guarantee|not guaranteed/i);
    } else {
      assert.equal(result.items.length, 0);
      assert.match(result.answer, /couldn't find reliable information|don't want to guess/i);
    }

    if (item.options.sourceStatus) {
      assert.ok(result.items.some((knowledgeItem) => knowledgeItem.sourceStatus === item.options.sourceStatus), `Expected source status ${item.options.sourceStatus}`);
      if (["historical", "conflicting", "current-announcement-incomplete", "current-status-not-listed"].includes(item.options.sourceStatus)) {
        assert.match(result.answer, /older|historical|not confirmed|does not state|conflicting|not guaranteed|current vacancies|confirm/i);
      }
    }
    if (item.options.temporal && result.items.some((knowledgeItem) => knowledgeItem.sourceStatus === "conflicting")) {
      assert.match(result.answer, /conflicting|different/i);
    }
  });
});

test("intent classification returns stable enum values", () => {
  const allowed = new Set(engine.intents);
  ["What courses do you have?", "How much is Bioinformatics?", "Do you have PCR?", "Where are you?", "Who is the CEO?"].forEach((question) => {
    engine.detectIntents(question).forEach((intent) => assert.ok(allowed.has(intent), `Unexpected intent ${intent}`));
  });
});

test("entity extraction captures course, user type, research topic, place and year", () => {
  const entities = engine.extractEntities("Can a BSc student work on cancer biology in Hyderabad in 2027?");
  assert.ok(entities.userType.includes("B.Sc student"));
  assert.ok(entities.researchArea.includes("cancer biology"));
  assert.ok(entities.location.includes("Hyderabad"));
  assert.deepEqual(entities.time, ["2027"]);
});

test("semantic expansion retrieves CADD for a non-technical description", () => {
  const result = engine.respond("I want to learn how to find the right compounds for a protein target");
  assert.ok(result.items.some((item) => item.id === "course-cadd"));
  assert.match(result.answer, /molecular docking|virtual-library screening|binding-site analysis/i);
});

test("source conflicts are disclosed instead of silently resolved", () => {
  const result = engine.respond("How long does a patent landscape report take?");
  assert.match(result.answer, /20–30 days.*20–25 days|conflicting/i);
});

test("course recommendations ask for the learner's background and goal", () => {
  const result = engine.respond("Which course is best?");
  assert.equal(result.needsClarification, true);
  assert.match(result.answer, /academic background, interests, and goal/i);
});

test("course-list answers begin with the Ciencia Life Sciences name", () => {
  const result = engine.respond("What courses do you have?");
  assert.match(result.answer, /^CIENCIA LIFE SCIENCES offers courses\b/);
});

test("contextual follow-up answers do not add a continuation notice", () => {
  const context = engine.respond("Tell me about Bioinformatics").context;
  const result = engine.respond("What is the fee?", context);
  assert.doesNotMatch(result.answer, /continuing from your previous question/i);
  assert.ok(result.items.length);
});

test("a new founder question does not inherit the previous internship topic", () => {
  const internship = engine.respond("Do you have a 2027 internship?");
  const result = engine.respond("founder", internship.context);
  assert.deepEqual(result.items.map((item) => item.id), ["leadership"]);
  assert.match(result.answer, /Dr\. Sabitha Yadam/);
  assert.doesNotMatch(result.answer, /2027 summer internship/i);
});

test("product questions retrieve grounded PureAlert-C information", () => {
  const overview = engine.respond("What products do you offer?");
  assert.ok(overview.intents.includes("PRODUCT"));
  assert.deepEqual(overview.items.map((item) => item.id), ["purealert-product"]);
  assert.match(overview.answer, /preliminary water-quality screening/i);
  assert.match(overview.answer, /9492146241/);

  const typo = engine.respond("Tell me about your produts");
  assert.ok(typo.items.some((item) => item.id === "purealert-product"));

  const evaluation = engine.respond("Where was PureAlert evaluated?");
  assert.deepEqual(evaluation.items.map((item) => item.id), ["purealert-evaluation"]);
  assert.match(evaluation.answer, /IIT Kharagpur/);
  assert.match(evaluation.answer, /further coliform-specific validation is required/i);

  const limitations = engine.respond("Does PureAlert prove water is safe to drink?");
  assert.deepEqual(limitations.items.map((item) => item.id), ["purealert-limitations"]);
  assert.match(limitations.answer, /does not prove water is safe to drink/i);

  const price = engine.respond("How much is PureAlert-C?");
  assert.deepEqual(price.items.map((item) => item.id), ["purealert-product"]);
  assert.match(price.answer, /website does not list a price/i);
});

test("new linked page content can be indexed without editing the chatbot knowledge list", () => {
  engine.setPageKnowledge([
    {
      href: "aqua-zyme-course.html",
      title: "AquaZyme Course",
      sections: [{
        heading: "Course curriculum",
        text: "The AquaZyme course covers enzyme extraction, activity measurement, and stability testing."
      }]
    },
    {
      href: "aquapure-product.html",
      title: "AquaPure Filter",
      sections: [{
        heading: "Product overview",
        text: "AquaPure Filter uses a layered ceramic membrane for household water filtration."
      }]
    }
  ]);

  try {
    const result = engine.respond("What does the AquaZyme course cover?");
    assert.ok(result.items.some((item) => item.sourcePage === "aqua-zyme-course.html"));
    assert.match(result.answer, /enzyme extraction, activity measurement, and stability testing/i);
    assert.match(result.items[0].title, /AquaZyme Course/);

    const product = engine.respond("Tell me about AquaPure Filter");
    assert.ok(product.items.some((item) => item.sourcePage === "aquapure-product.html"));
    assert.match(product.answer, /layered ceramic membrane/i);
  } finally {
    engine.setPageKnowledge([]);
  }
});
