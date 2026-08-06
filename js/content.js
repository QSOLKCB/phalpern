/*
 * Physics X 95 educator content
 * Copyright (c) 2026 QSOL-IMC
 * SPDX-License-Identifier: MPL-2.0
 */
(function (root, factory) {
  const content = factory();
  if (typeof module === 'object' && module.exports) module.exports = content;
  if (root) root.PhysicsXContent = content;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const sources = Object.freeze({
    halpernSju: {
      title: 'Paul H. Halpern, PhD — Saint Joseph’s University',
      url: 'https://directory.sju.edu/paul-halpern',
      kind: 'Institutional profile',
      note: 'University biography and selected bibliography for Paul Halpern.'
    },
    halpernPublisher: {
      title: 'Paul Halpern — Basic Books',
      url: 'https://www.basicbooks.com/contributor/paul-halpern/',
      kind: 'Publisher record',
      note: 'Publisher biography and current list of Halpern titles.'
    },
    greatAtomDebate: {
      title: 'The Great Atom Debate — official book site',
      url: 'https://greatatomdebate.com/',
      kind: 'Author book site',
      note: 'The book’s declared scope: Mach, Boltzmann, atoms, and the nature of scientific reality.'
    },
    greatAtomDebatePublisher: {
      title: 'The Great Atom Debate — Basic Books',
      url: 'https://www.basicbooks.com/titles/paul-halpern/the-great-atom-debate/9781541607224/',
      kind: 'Publisher record',
      note: 'Official synopsis and publication information.'
    },
    machSep: {
      title: 'Ernst Mach — Stanford Encyclopedia of Philosophy',
      url: 'https://plato.stanford.edu/entries/ernst-mach/',
      kind: 'Scholarly reference',
      note: 'Mach’s empiricism, economy of thought, and influence on philosophy of science.'
    },
    boltzmannOptica: {
      title: 'Ludwig Boltzmann: A Pioneer in Atomic Theory',
      url: 'https://www.optica-opn.org/home/articles/volume_22/issue_11/features/ludwig_boltzmann_a_pioneer_in_atomic_theory/',
      kind: 'Professional history',
      note: 'Historical overview of Boltzmann’s kinetic and statistical work and his conflict with Mach.'
    },
    perrinNobel: {
      title: 'Jean Baptiste Perrin — Nobel Prize biography',
      url: 'https://www.nobelprize.org/prizes/physics/1926/perrin/biographical/',
      kind: 'Institutional archive',
      note: 'Perrin’s molecular research and experimental work on Brownian motion.'
    },
    einstein1905: {
      title: 'Albert Einstein’s 1905 papers — Library of Congress',
      url: 'https://guides.loc.gov/einstein-annus-mirabilis/1905-papers',
      kind: 'Primary-source guide',
      note: 'Links and context for the four annus mirabilis papers and Einstein’s dissertation.'
    },
    einsteinNobel: {
      title: 'Albert Einstein — Nobel Prize in Physics 1921',
      url: 'https://www.nobelprize.org/prizes/physics/1921/einstein/facts/',
      kind: 'Institutional archive',
      note: 'Prize citation, including the law of the photoelectric effect.'
    },
    lightNobelArchive: {
      title: 'The dual nature of light in the Nobel archives',
      url: 'https://www.nobelprize.org/prizes/themes/the-dual-nature-of-light-as-reflected-in-the-nobel-archives/',
      kind: 'Institutional history',
      note: 'Historical context for the light quantum and photoelectric effect.'
    },
    solvayArchives: {
      title: 'Solvay Institutes — conference archives',
      url: 'https://solvayinstitutes.be/home/archives/conferences-archives/',
      kind: 'Primary institutional archive',
      note: 'Proceedings and chronology of the Solvay Conferences, including the 1927 meeting on electrons and photons.'
    },
    solvayCern: {
      title: 'Participants of the Fifth Solvay Congress — CERN',
      url: 'https://cds.cern.ch/record/1998515',
      kind: 'Institutional image record',
      note: 'The 1927 group photograph and participant context.'
    },
    wilsonNobelPhoto: {
      title: 'C. T. R. Wilson photo gallery — Nobel Prize',
      url: 'https://www.nobelprize.org/prizes/physics/1927/wilson/photo-gallery/',
      kind: 'Institutional image record',
      note: 'Confirms the 1927 conference’s 29 participants and later Nobel-laureate count.'
    },
    feynmanLectures: {
      title: 'The Feynman Lectures on Physics — Caltech',
      url: 'https://www.feynmanlectures.caltech.edu/',
      kind: 'Institutional primary resource',
      note: 'Open Caltech edition, recordings, notes, and lecture context.'
    },
    physicsXHalpern: {
      title: 'Entire World Celebrates Birth of Richard Feynman — Paul Halpern',
      url: 'https://phalpern.medium.com/entire-world-celebrates-birth-of-richard-feynman-7b283eab130a',
      kind: 'Author essay',
      note: 'Halpern’s account of Feynman’s Physics X course and the human complexity of the Feynman legend.'
    },
    qedAip: {
      title: 'The Quantum Labyrinth — American Journal of Physics review',
      url: 'https://pubs.aip.org/ajp/article/86/2/159/1057809',
      kind: 'Scholarly review',
      note: 'Review context for Halpern’s Feynman–Wheeler history and the development of QED.'
    },
    schwingerAip: {
      title: 'Julian Schwinger — Physics Today',
      url: 'https://physicstoday.aip.org/news/julian-schwinger',
      kind: 'Professional history',
      note: 'Biographical context and Schwinger’s part in quantum electrodynamics.'
    },
    qedNobel: {
      title: 'The Nobel Prize in Physics 1965',
      url: 'https://www.nobelprize.org/prizes/physics/1965/summary/',
      kind: 'Institutional archive',
      note: 'Prize shared by Sin-Itiro Tomonaga, Julian Schwinger, and Richard Feynman for QED.'
    },
    multiverseHarvard: {
      title: 'Paul Halpern on The Allure of the Multiverse — Harvard Science',
      url: 'https://science.fas.harvard.edu/event/harvard-science-virtual-book-talk-paul-halpern',
      kind: 'Institutional event record',
      note: 'Synopsis of the book’s historical treatment of multiverse ideas and controversies.'
    }
  });

  const claimLabels = Object.freeze({
    standard: {
      label: 'Standard physics',
      meaning: 'A conventional model, equation, or result with its assumptions stated.'
    },
    historical: {
      label: 'Historical record',
      meaning: 'A claim tied to a named archive, publication record, or reputable historical source.'
    },
    interpretive: {
      label: 'Interpretive',
      meaning: 'A reading of significance or motive, presented as interpretation rather than laboratory fact.'
    },
    schematic: {
      label: 'Schematic model',
      meaning: 'A deliberately simplified visual or simulation that teaches a relationship without claiming full physical fidelity.'
    }
  });

  const categories = Object.freeze([
    { id: 'orientation', label: 'Using the Lab', icon: '⌂', description: 'Source boundaries, Halpern’s bookshelf, and a method for reading scientific history.' },
    { id: 'atoms', label: 'Atoms & Probability', icon: '⚄', description: 'Mach, Boltzmann, entropy, kinetic theory, Brownian motion, and the reality of atoms.' },
    { id: 'relativity', label: 'Einstein’s 1905', icon: '◷', description: 'Light quanta, Brownian motion, special relativity, and mass–energy.' },
    { id: 'quantum', label: 'Quantum Arguments', icon: 'ψ', description: 'Solvay, Einstein and Bohr, QED, and contrasting routes through the quantum labyrinth.' },
    { id: 'cosmology', label: 'Cosmic Rivalries', icon: '✦', description: 'Competing origin stories, the expanding universe, and multiverse controversies.' },
    { id: 'craft', label: 'Ways of Doing Physics', icon: '✎', description: 'Teaching, diagrams, blackboards, archives, and the human residue of calculation.' }
  ]);

  const articles = [
    {
      id: 'history-is-working-physics',
      category: 'orientation',
      title: 'History Is Working Physics',
      deck: 'The argument around an equation often explains what the equation was invented to settle.',
      period: 'Method',
      figures: ['Paul Halpern'],
      status: 'interpretive',
      summary: 'Physics X 95 treats scientific history as a working part of physics education. The people, instruments, objections, and failed alternatives reveal why a result mattered and what evidence it actually displaced.',
      atGlance: [
        'A finished formula hides the controversy that made its assumptions visible.',
        'Biography is useful when it clarifies choices, evidence, institutions, or style—not when it substitutes personality for proof.',
        'Every story in this lab separates historical record, standard physics, interpretation, and schematic modelling.'
      ],
      sections: [
        {
          heading: 'Arguments expose assumptions',
          paragraphs: [
            'Textbooks usually begin after the dust has settled. They state that matter is atomic, that entropy is statistical, or that moving clocks run slowly. Historical actors did not receive those claims as finished furniture. They had to decide which measurements counted, which unseen entities were legitimate, and which mathematical descriptions deserved physical meaning.',
            'That unfinished stage is educationally valuable. Mach’s resistance to atoms forces a learner to ask what evidence for an unobservable entity could look like. Boltzmann’s defence forces the parallel question: when does a model’s explanatory reach justify belief in the entities it uses? The debate is not decorative background; it is a diagnostic instrument for concepts.'
          ]
        },
        {
          heading: 'People without hero worship',
          paragraphs: [
            'Human stories can clarify how science moves through correspondence, lectures, rival formalisms, institutional access, and experiments. They can also distort. A witty anecdote may be memorable while being poorly sourced; a celebrated genius may eclipse collaborators; a dramatic “duel” may compress years of changing positions into one slogan.',
            'This lab therefore avoids invented dialogue and treats famous quotations cautiously. It asks what is documented, what is conventional physics, and what is an interpretive bridge. Paul Halpern’s history-of-physics writing is the inspiration for that posture: difficult ideas become navigable through people, but the people remain embedded in evidence.'
          ]
        },
        {
          heading: 'Use the lab as a network',
          paragraphs: [
            'Follow the timeline when chronology matters, the story articles when an argument matters, and the exhibits when a relationship can be tested by changing a parameter. The atlas never proves a historical claim. A simulated gas can make kinetic reasoning visible, but an archive or experiment is still needed to establish what somebody argued and why a community changed its mind.',
            'The classroom pathways deliberately cross those modes. Learners read a historical disagreement, manipulate a declared model, inspect the source trail, and then write a narrower claim than the one they began with. That sequence turns admiration into inquiry.'
          ]
        }
      ],
      activity: {
        title: 'Four-label audit',
        steps: [
          'Choose one sentence from a science-history article.',
          'Label it historical record, standard physics, interpretive, or schematic.',
          'Name the evidence that would justify that label.',
          'Rewrite the sentence if its confidence exceeds its evidence.'
        ]
      },
      check: {
        question: 'Why can a correct simulation fail to establish a historical claim?',
        answer: 'A simulation demonstrates consequences of its declared model. A historical claim concerns what happened, who argued what, or how evidence was received, so it requires documentary or institutional sources as well.'
      },
      teacherNote: 'Ask students to find one sentence whose label could change depending on wording. The exercise is about claim scope, not merely source prestige.',
      sources: ['halpernSju', 'halpernPublisher'],
      related: ['claim-labels', 'halpern-bookshelf', 'mach-boltzmann']
    },
    {
      id: 'halpern-bookshelf',
      category: 'orientation',
      title: 'A Halpern Bookshelf Map',
      deck: 'Nineteen books form a set of recurring routes through physics: debates, partnerships, cosmic origins, and speculative boundaries.',
      period: 'Contemporary guide',
      figures: ['Paul Halpern'],
      status: 'historical',
      summary: 'This article maps selected Paul Halpern books by the kinds of scientific relationship they illuminate. It is a guide to themes rather than a substitute for the books, and it uses the current publisher and university records for bibliography.',
      atGlance: [
        'The Great Atom Debate centres Mach and Boltzmann’s conflict over atomic reality.',
        'The Quantum Labyrinth follows Richard Feynman and John Wheeler through modern physics.',
        'Flashes of Creation and The Allure of the Multiverse frame cosmology through competing ideas and personalities.'
      ],
      sections: [
        {
          heading: 'Debate as a map of concepts',
          paragraphs: [
            'The newest title listed by Halpern’s publisher for this 2026 edition is The Great Atom Debate. Its centre is not simply a yes-or-no question about atoms. It is a clash over what physics should admit as real, how statistical explanation works, and whether successful unobservable entities are discoveries or economical fictions.',
            'Einstein’s Dice and Schrödinger’s Cat and The Quantum Labyrinth use a related device: intellectual relationships reveal the shape of a theory. Einstein and Schrödinger expose unresolved questions about quantum completeness; Feynman and Wheeler expose contrasting styles of invention, mentorship, and representation.'
          ]
        },
        {
          heading: 'Cosmology as contested storytelling',
          paragraphs: [
            'Flashes of Creation follows the rivalry between Big Bang and steady-state cosmologies. The Allure of the Multiverse extends the historical lens to a family of proposals whose meanings differ across inflation, quantum mechanics, and philosophical selection effects. In both cases, a label can conceal several mechanisms and several standards of evidence.',
            'Earlier books range across time, higher dimensions, wormholes, dark matter, exoplanets, particle accelerators, and the cultural life of scientific ideas. The recurring method is more stable than any one topic: orient a difficult concept through the people who argued, calculated, observed, and communicated it.'
          ]
        },
        {
          heading: 'How this tribute uses the work',
          paragraphs: [
            'Physics X 95 does not reproduce Halpern’s books or present itself as an authorised adaptation. It is an independent educational tribute. The prose, activities, software, diagrams, and source notes here are original; book titles and concise bibliographic descriptions remain the property and record of their publishers and author.',
            'The best use of this map is outward. Open the official book page, select the historical thread that interests you, and return to the lab to test a related equation or build a classroom discussion. The software is a doorway, not a compressed replacement for narrative scholarship.'
          ]
        }
      ],
      activity: {
        title: 'Build a reading constellation',
        steps: [
          'Choose one scientific question: atoms, quantum interpretation, cosmic origins, or multiple universes.',
          'Select a Halpern title linked to that question.',
          'Pair it with one institutional or primary source from the Reference Desk.',
          'Write what each source type can contribute that the other cannot.'
        ]
      },
      check: {
        question: 'Why is the bookshelf presented as a thematic map rather than a sequence of settled facts?',
        answer: 'The books are histories and explanations of different debates. Their value lies in the routes and relationships they trace; treating them as a single ladder of settled claims would erase those differences.'
      },
      teacherNote: 'A strong extension is to compare the publisher synopsis with a professional review and identify the different jobs each text performs.',
      sources: ['halpernSju', 'halpernPublisher', 'greatAtomDebatePublisher', 'multiverseHarvard', 'qedAip'],
      related: ['mach-boltzmann', 'feynman-wheeler', 'big-bang-rivals', 'multiverse-map']
    },
    {
      id: 'claim-labels',
      category: 'orientation',
      title: 'Four Labels for Honest Models',
      deck: 'A visual can be useful without being exact, and a compelling story can be meaningful without becoming a physical law.',
      period: 'Method',
      figures: ['Learner', 'Historian', 'Physicist'],
      status: 'interpretive',
      summary: 'The lab’s four editorial labels prevent a common category error: sliding from a sourced historical claim into an exact physical claim, or from a teaching animation into evidence that the world literally behaves like the screen.',
      atGlance: [
        'Standard physics names assumptions and conventional equations.',
        'Historical record identifies documentary provenance.',
        'Interpretive claims explain significance without masquerading as measurements.',
        'Schematic models show a relationship while declaring omitted physics.'
      ],
      sections: [
        {
          heading: 'Standard is not assumption-free',
          paragraphs: [
            'The ideal-gas relation and special-relativistic time dilation are standard physics, but a standard model still has a domain. Point particles with no mutual forces are not a complete account of a dense real gas. An inertial light clock is not a complete treatment of acceleration, gravity, or the engineering of an actual clock.',
            'The label therefore signals a tested conventional relationship together with the assumptions displayed in the article or exhibit. It is not a universal badge that makes every visual detail physically literal.'
          ]
        },
        {
          heading: 'History needs provenance',
          paragraphs: [
            'A date, participant list, prize citation, or paper title can be checked against an archive. A claim about what a person privately intended may require letters, notebooks, or careful scholarship and can remain disputed even when the publication record is clear.',
            'Historical record in this lab means that a named source supports the narrow statement being made. It does not mean that every later interpretation of the event is uniquely determined.'
          ]
        },
        {
          heading: 'Interpretation and schematic value',
          paragraphs: [
            'Interpretation connects facts into meaning: a disagreement may expose standards of evidence, or a teaching style may reveal a view of problem solving. Such connections are valuable when they remain open to argument. They become misleading only when presented as if a meter or archive directly measured the interpretation.',
            'A schematic animation has a similar boundary. The Brownian exhibit makes random forcing and mean-squared displacement visible, but it does not resolve fluid molecules or reproduce a specific experiment. Declaring that limit is part of the model, not an apology appended to it.'
          ]
        }
      ],
      activity: {
        title: 'Repair an overclaim',
        steps: [
          'Start with: “The animation proves that atoms exist.”',
          'Identify the category error in the sentence.',
          'Rewrite it as a schematic teaching claim.',
          'Add the historical evidence needed for a claim about atomic reality.'
        ]
      },
      check: {
        question: 'Does “standard physics” mean a model contains no idealisations?',
        answer: 'No. It means the relationship is conventional and well established within stated assumptions. Idealisation and domain are still part of an honest standard model.'
      },
      teacherNote: 'Keep the labels available during every exhibit. Ask students to say the label aloud before describing what a moving canvas object “is.”',
      sources: ['einstein1905', 'solvayArchives', 'feynmanLectures'],
      related: ['history-is-working-physics', 'brownian-verdict', 'light-clock']
    },
    {
      id: 'mach-boltzmann',
      category: 'atoms',
      title: 'Mach, Boltzmann, and Atomic Reality',
      deck: 'The dispute was not ignorance versus enlightenment. It was a serious conflict over evidence, explanation, and what physics was allowed to call real.',
      period: 'Late nineteenth century',
      figures: ['Ernst Mach', 'Ludwig Boltzmann', 'Wilhelm Ostwald'],
      status: 'historical',
      summary: 'Boltzmann used molecular motion and probability to explain thermodynamics. Mach resisted granting physical reality to entities that could not then be directly observed, placing the atom debate inside a larger argument about the aims of physics.',
      atGlance: [
        'Boltzmann’s statistical mechanics relied on molecular microstates beneath macroscopic heat and pressure.',
        'Mach’s empiricism demanded economy and caution about unseen mechanisms.',
        'Later evidence favoured atomic reality, but Mach’s questions about inference and observability did not become meaningless.'
      ],
      sections: [
        {
          heading: 'A disagreement about the job of theory',
          paragraphs: [
            'Kinetic theory explains gas pressure as momentum transferred by many moving molecules and temperature as a measure tied to their agitation. Boltzmann pushed that programme toward a statistical account of thermodynamics. Macroscopic regularity emerged from overwhelmingly probable arrangements rather than from an exceptionless mechanical command imposed on each molecule.',
            'Mach was suspicious of turning useful theoretical elements into metaphysical furniture. His programme emphasised observable relations, economical description, and resistance to mechanical pictures that exceeded the evidence. In an era before direct atomic-scale imaging and before decisive Brownian measurements, that caution had intellectual force.'
          ]
        },
        {
          heading: 'Why the conflict cut so deep',
          paragraphs: [
            'If atoms were merely calculation devices, Boltzmann’s microstates could organise phenomena without describing what matter really was. If atoms were real, the statistical machinery was a bridge from unseen constituents to visible thermodynamics. The same successful equations could therefore sit inside different views of scientific knowledge.',
            'The dispute also concerned reversibility. Microscopic mechanical laws seemed reversible while entropy increased macroscopically. Critics asked how irreversible behaviour could follow from reversible motion. Boltzmann’s answer depended on probability, typicality, and boundary conditions—ideas whose interpretation remained difficult even after atomism prevailed.'
          ]
        },
        {
          heading: 'Victory without caricature',
          paragraphs: [
            'Einstein’s 1905 Brownian-motion analysis and Jean Perrin’s experimental programme gave quantitative routes from visible suspended particles to molecular scales. Atomic theory gained evidence that was not simply another convenient chemical notation. The evidential landscape changed.',
            'It is still misleading to retell the episode as one clever person seeing obvious truth while opponents refused to look. The historical value lies in the standards being negotiated: indirect evidence, explanatory unification, observability, and the difference between using a model and believing its ontology.'
          ]
        }
      ],
      activity: {
        title: 'Stage the atom debate with evidence cards',
        steps: [
          'Assign one group Mach’s methodological caution and another Boltzmann’s explanatory programme.',
          'Give both groups the same pre-1905 evidence and forbid hindsight.',
          'Introduce Einstein’s Brownian prediction and Perrin’s measurements as new cards.',
          'Ask each group which claim changes, and why.'
        ]
      },
      check: {
        question: 'What changed the atom debate more effectively than simply repeating that kinetic theory was useful?',
        answer: 'Quantitative links from observable Brownian motion to molecular parameters supplied new empirical access to the entities the theory described.'
      },
      teacherNote: 'Do not assign Mach the role of “anti-science.” Have students formulate the strongest version of his evidential objection before introducing later measurements.',
      sources: ['greatAtomDebate', 'greatAtomDebatePublisher', 'machSep', 'boltzmannOptica', 'perrinNobel', 'einstein1905'],
      related: ['entropy-probability', 'brownian-verdict', 'annus-mirabilis']
    },
    {
      id: 'entropy-probability',
      category: 'atoms',
      title: 'Entropy Becomes a Counting Problem',
      deck: 'Boltzmann’s relation connects a thermodynamic state to the number of microscopic arrangements compatible with it.',
      period: '1870s onward',
      figures: ['Ludwig Boltzmann', 'James Clerk Maxwell'],
      status: 'standard',
      summary: 'Statistical mechanics explains why equilibrium dominates: vastly more microstates correspond to ordinary equilibrium macrostates than to conspicuously ordered ones. Entropy tracks that multiplicity through Boltzmann’s celebrated relation.',
      atGlance: [
        'A macrostate records coarse quantities; a microstate specifies microscopic detail.',
        'Multiplicity W counts microstates compatible with a macrostate.',
        'S = k ln W turns multiplicative counts into additive entropy.',
        'The second law is statistical, not a claim that reverse fluctuations are logically impossible.'
      ],
      equation: {
        expression: 'S = k₍B₎ ln W',
        explanation: 'Entropy S is proportional to the logarithm of multiplicity W; k₍B₎ sets the physical unit scale.'
      },
      sections: [
        {
          heading: 'Microstates and macrostates',
          paragraphs: [
            'Imagine distributing particles between the left and right halves of a box. A macrostate might record only the count on each side. A microstate records which particular particle is where and, in a fuller treatment, its position and momentum. Many distinct microstates can look identical at the macroscopic resolution.',
            'For a modest number of distinguishable two-sided tokens, the balanced macrostate has the largest binomial multiplicity. As the number grows, extremely lopsided arrangements occupy a vanishing fraction of the possibilities. Equilibrium is ordinary because its compatible region of state space is overwhelmingly large.'
          ]
        },
        {
          heading: 'Why the logarithm appears',
          paragraphs: [
            'For independent systems, multiplicities multiply: W total equals W one times W two. Thermodynamic entropies add. The logarithm converts that product into a sum, matching the way extensive quantities combine. Boltzmann’s constant translates the dimensionless count into thermodynamic units.',
            'The compact inscription does not by itself settle every foundational question. What counts as a microstate, which constraints define the ensemble, how dynamics explores state space, and what coarse graining is appropriate all matter. The equation is powerful precisely because those modelling choices can be stated.'
          ]
        },
        {
          heading: 'An arrow made of typicality',
          paragraphs: [
            'Microscopic equations can permit time-reversed trajectories while macroscopic entropy nearly always rises from a low-entropy preparation. Statistical mechanics explains the asymmetry through typical evolution from a special boundary condition into vastly larger regions of phase space.',
            'Small systems can fluctuate. The statistical second law predicts overwhelming likelihood at macroscopic scales, not metaphysical prohibition. The Entropy Board exhibit makes the combinatorics exact for a toy two-state system while labelling the bridge to thermodynamics as a model.'
          ]
        }
      ],
      activity: {
        title: 'Count before calculating entropy',
        steps: [
          'Arrange eight two-sided tokens and choose a macrostate by number showing each face.',
          'Calculate its multiplicity with the binomial coefficient.',
          'Compare the balanced and all-one-side macrostates.',
          'Use the Entropy Board to extend the count to twenty tokens.'
        ]
      },
      check: {
        question: 'Why is a balanced split more typical than all particles on one side?',
        answer: 'Many more microstates realise a balanced macrostate. The all-on-one-side macrostate has very few compatible arrangements, so it occupies a much smaller fraction of the possibilities.'
      },
      teacherNote: 'Keep “more disordered” secondary to the count. Multiplicity is precise; visual disorder can be subjective or representation-dependent.',
      sources: ['boltzmannOptica', 'greatAtomDebatePublisher'],
      related: ['mach-boltzmann', 'brownian-verdict', 'claim-labels']
    },
    {
      id: 'brownian-verdict',
      category: 'atoms',
      title: 'Brownian Motion and the Atomic Verdict',
      deck: 'Visible grains jitter because an invisible molecular environment transfers momentum unevenly from moment to moment.',
      period: '1905–1909',
      figures: ['Albert Einstein', 'Jean Perrin', 'Robert Brown'],
      status: 'standard',
      summary: 'Einstein turned Brownian motion into a quantitative test of molecular kinetic theory. Perrin’s measurements helped convert an old microscopic curiosity into strong evidence for atoms and a route to Avogadro’s number.',
      atGlance: [
        'The suspended grain is much larger than the molecules that buffet it.',
        'The average displacement can vanish while mean-squared displacement grows.',
        'In ordinary diffusion, mean-squared displacement is proportional to elapsed time.',
        'A schematic random walk is not a molecular-dynamics reconstruction.'
      ],
      equation: {
        expression: '⟨r²(t)⟩ = 4Dt  (two dimensions)',
        explanation: 'For ideal two-dimensional diffusion, mean-squared displacement grows linearly with time; D is the diffusion coefficient.'
      },
      sections: [
        {
          heading: 'From irregular motion to a measurable law',
          paragraphs: [
            'A suspended particle receives enormous numbers of molecular impacts. Perfect balance is not maintained at every short interval, so the net impulse wanders. The visible trajectory is irregular even when the fluid is macroscopically still and has no preferred direction.',
            'A single path is noisy, so the useful prediction concerns an ensemble or repeated intervals. Signed displacement averages can cancel, while squared displacement remains positive. The linear relation between mean-squared displacement and time provides a statistical signature that can be compared with observation.'
          ]
        },
        {
          heading: 'Einstein’s bridge',
          paragraphs: [
            'Einstein’s 1905 treatment linked diffusion to temperature, viscosity, particle size, and molecular constants. That bridge mattered philosophically because it transformed the atomic hypothesis into quantitative consequences visible through a microscope. It was not a picture of individual atoms; it was a derivation connecting scales.',
            'Perrin and collaborators measured Brownian behaviour and obtained converging estimates of molecular quantities. His Nobel record emphasises work on the discontinuous structure of matter. The debate did not end because atoms became directly visible in the modern imaging sense; it changed because independent quantitative routes converged.'
          ]
        },
        {
          heading: 'Reading the exhibit honestly',
          paragraphs: [
            'The Brownian Microscope in this lab uses random impulses to move a drawn grain and displays an estimated mean-squared displacement. It omits hydrodynamic memory, realistic molecular collisions, three-dimensional motion, and instrument noise. Its purpose is to make ensemble reasoning visible.',
            'The historical evidence lies in papers and experiments, not in the browser animation. The animation can help a learner understand why a statistical quantity was needed before they inspect how Einstein and Perrin connected that quantity to physical constants.'
          ]
        }
      ],
      activity: {
        title: 'Measure a random path',
        steps: [
          'Run the Brownian exhibit at fixed temperature and record squared displacement at equal time intervals.',
          'Reset and repeat several times rather than trusting one path.',
          'Compare the average trend at two temperatures.',
          'List the omitted physics that prevents the canvas from being a real Perrin experiment.'
        ]
      },
      check: {
        question: 'Why square displacement instead of averaging signed displacement?',
        answer: 'Unbiased positive and negative displacements cancel in a signed average. Squaring preserves the size of the wandering and produces an ensemble quantity that grows with time for diffusion.'
      },
      teacherNote: 'Have students predict the graph before running repeated trials. One noisy trajectory should not be used to “verify” a straight line.',
      sources: ['einstein1905', 'perrinNobel', 'greatAtomDebatePublisher'],
      related: ['mach-boltzmann', 'entropy-probability', 'annus-mirabilis']
    },
    {
      id: 'annus-mirabilis',
      category: 'relativity',
      title: 'Einstein’s 1905 Constellation',
      deck: 'Four papers attacked four fault lines: light, molecular motion, moving frames, and the inertia of energy.',
      period: '1905',
      figures: ['Albert Einstein', 'Michele Besso', 'Max Planck'],
      status: 'historical',
      summary: 'Einstein’s annus mirabilis was not one theory delivered in four instalments. The papers addressed distinct problems, but together they rearranged how physics understood quanta, atoms, space, time, mass, and energy.',
      atGlance: [
        'March: a heuristic light-quantum proposal explained photoelectric regularities.',
        'May: Brownian motion became a quantitative test of molecular kinetic theory.',
        'June: special relativity reconstructed space and time for inertial frames.',
        'September: a short follow-up connected a body’s energy content with inertia.'
      ],
      sections: [
        {
          heading: 'Four problems, not a greatest-hits list',
          paragraphs: [
            'The light-quantum paper extended Planck’s quantum idea in a radical direction: radiation itself could behave as localised energy quanta in emission and absorption. This was not immediately identical to the mature photon concept, and acceptance was slow even after the photoelectric equation worked.',
            'The Brownian paper occupied a different frontier. It used molecular kinetic theory to predict statistics of visible suspended particles. The special-relativity paper then rebuilt kinematics from the relativity principle and invariant light speed. The mass–energy note followed as a consequence concerning inertia and energy content.'
          ]
        },
        {
          heading: 'What the Nobel citation says',
          paragraphs: [
            'Einstein’s 1921 Nobel Prize was awarded for services to theoretical physics and specifically for discovery of the law of the photoelectric effect. That citation is a useful corrective to retrospective storytelling that treats the prize as simply “for relativity.”',
            'It also shows how experimental confirmation and institutional caution shape recognition. Relativity became Einstein’s public emblem, but the award language attached itself to a result whose empirical standing the committee regarded as secure.'
          ]
        },
        {
          heading: 'A constellation across the lab',
          paragraphs: [
            'The interactive 1905 map places the papers around shared nineteenth-century problems rather than ranking them. Select a node to see its question, conceptual move, and later evidential route. Links between nodes indicate conceptual traffic, not a claim that one paper mathematically derives all the others.',
            'For classroom use, the key comparison is methodological. One paper offered a statistical bridge to unseen molecules, another altered operational definitions of simultaneity, and another proposed quantised radiation. “Revolutionary” names their later impact but should not erase the different kinds of reasoning involved.'
          ]
        }
      ],
      activity: {
        title: 'Sort the 1905 methods',
        steps: [
          'Open each node in the 1905 Constellation exhibit.',
          'Classify its main move as statistical inference, kinematic reconstruction, quantum hypothesis, or consequence.',
          'Attach one later experimental or institutional milestone to each paper.',
          'Explain why one generic word such as “genius” teaches less than the comparison.'
        ]
      },
      check: {
        question: 'Which 1905 result was named specifically in Einstein’s Nobel Prize citation?',
        answer: 'The discovery of the law of the photoelectric effect was named specifically.'
      },
      teacherNote: 'Avoid presenting E = mc² as the opening equation of the June relativity paper. The mass–energy note was a separate short paper received later in 1905.',
      sources: ['einstein1905', 'einsteinNobel', 'lightNobelArchive'],
      related: ['brownian-verdict', 'light-clock', 'solvay-1927']
    },
    {
      id: 'light-clock',
      category: 'relativity',
      title: 'The Light Clock and Proper Time',
      deck: 'If every inertial observer measures the same light speed, a moving light clock traces a longer spacetime route between ticks.',
      period: 'Special relativity',
      figures: ['Albert Einstein', 'Hendrik Lorentz'],
      status: 'standard',
      summary: 'A light clock is a compact thought experiment for time dilation. Its mirrors and pulse make the invariant speed of light and frame-dependent elapsed time geometrically visible without treating the animation as an actual mechanical clock.',
      atGlance: [
        'Proper time is measured by a clock travelling with the events it times.',
        'The Lorentz factor γ equals 1 divided by the square root of 1 minus β squared.',
        'For nonzero relative speed, coordinate time between the moving clock’s ticks is γ times its proper time.',
        'The result is reciprocal between inertial frames; acceleration matters when clocks reunite.'
      ],
      equation: {
        expression: 'Δt = γΔτ,   γ = 1 / √(1 − β²),   β = v/c',
        explanation: 'Δτ is the clock’s proper time and Δt is the elapsed coordinate time in a frame where that clock moves at speed v.'
      },
      sections: [
        {
          heading: 'A geometric tick',
          paragraphs: [
            'In the clock’s rest frame, a light pulse travels vertically between two mirrors. An observer who sees the apparatus move horizontally describes the pulse as following a diagonal path. Because both observers measure the same light speed, the longer path requires more coordinate time.',
            'The right triangle formed by mirror separation, horizontal displacement, and light path yields the Lorentz factor. The exhibit draws rest and moving descriptions side by side and computes gamma directly from the speed slider.'
          ]
        },
        {
          heading: 'What the diagram does not settle',
          paragraphs: [
            'A single inertial comparison is symmetric: each inertial observer can describe the other clock as running slowly. The apparent paradox disappears when one specifies which pairs of events are compared and how distant clocks are synchronised in each frame.',
            'The travelling-twin scenario adds changes of inertial frame and a reunion, so the worldlines are not symmetric. This exhibit deliberately stops before that problem. It teaches one relationship cleanly rather than smuggling acceleration into an inertial picture.'
          ]
        },
        {
          heading: 'Operational definitions matter',
          paragraphs: [
            'Special relativity is not merely a visual trick about diagonals. The thought experiment rests on operational commitments about clocks, simultaneity, inertial frames, and invariant light speed. The geometry becomes physical because those commitments organise measurements.',
            'That is why thought experiments belong beside historical context. They show how a conceptual reconstruction can change the meaning of basic quantities rather than merely correcting an old numerical prediction.'
          ]
        }
      ],
      activity: {
        title: 'Read gamma before moving the slider',
        steps: [
          'Calculate gamma by hand for β = 0, 0.6, and 0.8.',
          'Predict the moving light path and elapsed time for one proper second.',
          'Check the values in the Light Clock exhibit.',
          'Explain why the model does not by itself resolve the twin scenario.'
        ]
      },
      check: {
        question: 'At β = 0.6, what is the Lorentz factor?',
        answer: 'γ = 1 / √(1 − 0.36) = 1 / 0.8 = 1.25.'
      },
      teacherNote: 'Keep language frame-specific: “the moving clock accumulates less proper time between these events” is safer than saying time itself vaguely “slows down.”',
      sources: ['einstein1905', 'feynmanLectures'],
      related: ['annus-mirabilis', 'einstein-bohr', 'claim-labels']
    },
    {
      id: 'solvay-1927',
      category: 'quantum',
      title: 'Solvay 1927: Electrons and Photons',
      deck: 'The famous photograph is a doorway, not the conference: the substance lies in reports, objections, calculations, and conversations around a new quantum theory.',
      period: '24–29 October 1927',
      figures: ['Hendrik Lorentz', 'Albert Einstein', 'Niels Bohr', 'Marie Curie', 'Werner Heisenberg'],
      status: 'historical',
      summary: 'The Fifth Solvay Conference gathered 29 participants around electrons and photons. Seventeen were or became Nobel laureates, but the event matters for the live foundational problems of quantum mechanics rather than for a superlative attached to its group photograph.',
      atGlance: [
        'The conference topic was Electrons and Photons, chaired by Hendrik Lorentz.',
        'Twenty-nine scientists appear in the institutional participant record.',
        'Einstein pressed thought-experiment objections; Bohr and colleagues defended the emerging quantum framework.',
        'The standard group photograph should not collapse 29 programmes into one “team.”'
      ],
      sections: [
        {
          heading: 'A conference at a conceptual bottleneck',
          paragraphs: [
            'By 1927, matrix mechanics, wave mechanics, uncertainty relations, and the Born probability rule had rapidly changed quantum theory. Their mathematical successes did not automatically supply a shared account of measurement, reality, or the completeness of the state description.',
            'The Solvay meeting brought leading contributors into one room under Lorentz’s chairmanship. Formal talks were only part of the event’s later memory. Discussions around Einstein’s objections and Bohr’s responses became emblematic of a deeper division over what the theory allowed physicists to claim.'
          ]
        },
        {
          heading: 'Read the photograph as a map',
          paragraphs: [
            'The seating map exhibit reconstructs the three rows of the institutional photograph as labelled nodes. Selecting a participant reveals a concise research connection. A laureate filter visualises the often-cited count without implying that a Nobel Prize is the measure of every contribution in the room.',
            'Several programmes coexist in the image: spectroscopy, wave mechanics, matrix mechanics, relativity, experimental radiation physics, thermodynamics, and more. The map resists turning the photograph into a generic icon of intelligence by restoring names and differences.'
          ]
        },
        {
          heading: 'Beyond the slogan duel',
          paragraphs: [
            'Popular retellings reduce the Einstein–Bohr exchange to quotations about dice and God. Exact wording and timing of famous lines are often unstable across recollections. The more reliable lesson is structural: Einstein designed increasingly careful situations intended to expose incompleteness or inconsistency, and Bohr analysed the full experimental arrangement to answer them.',
            'That pattern continued beyond the week in Brussels. The 1935 Einstein–Podolsky–Rosen argument and Bohr’s response shifted the debate again. Solvay is therefore best understood as a concentrated episode in a long research programme, not a final scorecard.'
          ]
        }
      ],
      activity: {
        title: 'Unflatten the photograph',
        steps: [
          'Open the Solvay Seating Map and select five participants from different rows.',
          'Record one distinct research connection for each person.',
          'Filter to later Nobel laureates, then restore all participants.',
          'Explain what intellectual history would be lost if only laureates remained.'
        ]
      },
      check: {
        question: 'What was the official topic of the Fifth Solvay Conference?',
        answer: 'Electrons and Photons.'
      },
      teacherNote: 'Treat the famous photograph as metadata for the proceedings, not as evidence that every participant held the same interpretation of quantum mechanics.',
      sources: ['solvayArchives', 'solvayCern', 'wilsonNobelPhoto'],
      related: ['einstein-bohr', 'annus-mirabilis', 'qed-routes']
    },
    {
      id: 'einstein-bohr',
      category: 'quantum',
      title: 'Einstein and Bohr: What Was at Stake?',
      deck: 'Their disagreement concerned completeness, separability, experimental arrangements, and what a physical theory should describe.',
      period: '1920s–1930s',
      figures: ['Albert Einstein', 'Niels Bohr', 'Boris Podolsky', 'Nathan Rosen'],
      status: 'interpretive',
      summary: 'Einstein’s objections did not amount to ignorance of quantum success, and Bohr’s replies were not simply a refusal of realism. Their exchange tested the conceptual architecture of the theory through carefully designed thought experiments.',
      atGlance: [
        'Einstein accepted quantum predictions while questioning whether the state description was complete.',
        'Bohr emphasised the conditions under which quantities can be meaningfully defined and measured.',
        'The EPR argument sharpened questions about locality, separability, and elements of reality.',
        'Later experiments changed the landscape, but they do not turn the historical debate into a cartoon.'
      ],
      sections: [
        {
          heading: 'Not belief versus disbelief',
          paragraphs: [
            'Einstein helped launch quantum theory through the light quantum and other work. His later criticism targeted the claim that the quantum state was a complete account of an individual physical situation. He looked for principles beneath the statistical formalism, not a return to ignorance of its empirical achievements.',
            'Bohr’s position is also easy to oversimplify. His emphasis on complementarity concerned the mutually exclusive experimental arrangements required to define certain classical quantities. A measurement context was not an optional disturbance pasted onto a pre-existing list of values.'
          ]
        },
        {
          heading: 'Thought experiments as stress tests',
          paragraphs: [
            'At and after Solvay, Einstein proposed arrangements intended to make the emerging interpretation yield contradictory or incomplete claims. Bohr’s replies examined the apparatus, conservation laws, and the conditions that made a quantity measurable. The exchange improved conceptual precision even where agreement did not follow.',
            'In 1935, Einstein, Podolsky, and Rosen presented a criterion of physical reality and argued that the quantum-mechanical description was incomplete. Bohr replied within his framework of phenomena and experimental conditions. Later Bell-type work transformed some philosophical alternatives into experimentally discriminable inequalities, but that is a later chapter with new assumptions.'
          ]
        },
        {
          heading: 'Productive disagreement',
          paragraphs: [
            'The educational lesson is not to choose a winner by personality. It is to trace which premise each argument needs: locality, separability, completeness, counterfactual measurement, or contextual definition. Once the premises are visible, the debate becomes a map of research questions.',
            'Halpern’s histories repeatedly use intellectual relationships in this way. A rivalry or friendship gives narrative motion, while the durable value comes from seeing how different standards of explanation collide and force more exact questions.'
          ]
        }
      ],
      activity: {
        title: 'Premise map',
        steps: [
          'Write “complete state description” in the centre of a page.',
          'Add branches for locality, measurement context, predictability, and separability.',
          'Place one Einstein concern and one Bohr response on different branches.',
          'Identify which branch later Bell experiments address and which interpretive questions remain.'
        ]
      },
      check: {
        question: 'Did Einstein’s criticism amount to denying that quantum mechanics made successful predictions?',
        answer: 'No. His central concern was whether the quantum state supplied a complete description of individual physical reality.'
      },
      teacherNote: 'Require students to replace “Einstein hated quantum mechanics” and “Bohr defeated Einstein” with claims containing an explicit premise.',
      sources: ['solvayArchives', 'einstein1905', 'feynmanLectures'],
      related: ['solvay-1927', 'annus-mirabilis', 'multiverse-map']
    },
    {
      id: 'physics-x',
      category: 'craft',
      title: 'Physics X: Thinking in Public',
      deck: 'A question-led room made the process of attacking an unfamiliar problem part of the lesson.',
      period: 'Caltech, twentieth century',
      figures: ['Richard Feynman', 'Caltech undergraduates'],
      status: 'historical',
      summary: 'Feynman’s informal Physics X sessions invited undergraduate questions rather than following a fixed syllabus. Halpern’s essay describes the course as a place where Feynman thought on his feet and expected students to do likewise.',
      atGlance: [
        'Physics X was informal and question-driven rather than a standard lecture sequence.',
        'Its educational object was partly visible problem solving, not only polished answers.',
        'Feynman’s teaching archive is broader than the myths built around his personality.',
        'A productive tribute should preserve curiosity while retaining critical historical context.'
      ],
      sections: [
        {
          heading: 'No syllabus as a deliberate constraint',
          paragraphs: [
            'A prepared lecture can conceal how a physicist behaves before the path is known. In Physics X, a student question could force the instructor to identify relevant principles, estimate, discard a route, and try again in public. The process itself became observable.',
            'That format should not be confused with effortless improvisation. Thinking on one’s feet depends on accumulated technique: dimensions, limiting cases, symmetry, visualisation, and a willingness to expose uncertainty. The lack of a syllabus shifted preparation into habits of reasoning.'
          ]
        },
        {
          heading: 'Myth and record',
          paragraphs: [
            'Feynman’s public legend includes humour, iconoclasm, bongos, art, and stories shaped through popular memoir. Halpern’s essay acknowledges both the attraction of those stories and criticism of sexist material in some recollections. A historical lab should not edit complexity away to protect an inspirational silhouette.',
            'Caltech’s open Feynman Lectures archive provides another layer: recorded and written teaching that can be inspected directly. The responsible route is to place charisma, pedagogy, technical work, and criticism beside one another rather than letting any single strand stand for the person.'
          ]
        },
        {
          heading: 'Bring the method into this lab',
          paragraphs: [
            'Each pathway ends with an open question that can be attacked from first principles. The teacher’s role is not to imitate Feynman’s mannerisms. It is to make reasoning inspectable: state assumptions, draw a model, estimate a scale, test an extreme case, and say what remains unknown.',
            'That is the real connection between a retro multimedia lab and Physics X. The interface offers routes, but the learner supplies the question. Navigation is not a substitute for inquiry; it is a surface on which inquiry can leave a trace.'
          ]
        }
      ],
      activity: {
        title: 'Run a ten-minute Physics X',
        steps: [
          'Invite one question connected to an exhibit but do not open the exhibit yet.',
          'List assumptions and estimate the direction of change for each control.',
          'Use the exhibit only after predictions are public.',
          'Finish by naming one thing the model cannot answer.'
        ]
      },
      check: {
        question: 'What can an unscripted question reveal that a polished lecture often hides?',
        answer: 'It can reveal problem selection, assumptions, false starts, approximations, and the techniques used before a solution path is known.'
      },
      teacherNote: 'Reward explicit uncertainty and repaired reasoning. The exercise fails if performance of certainty becomes the hidden assessment criterion.',
      sources: ['physicsXHalpern', 'feynmanLectures'],
      related: ['qed-routes', 'feynman-wheeler', 'human-residue']
    },
    {
      id: 'qed-routes',
      category: 'quantum',
      title: 'Different Routes to Quantum Electrodynamics',
      deck: 'Tomonaga, Schwinger, and Feynman shared the 1965 Nobel Prize, but their formalisms and styles did not collapse into one biography.',
      period: '1940s–1965',
      figures: ['Sin-Itiro Tomonaga', 'Julian Schwinger', 'Richard Feynman', 'Freeman Dyson'],
      status: 'historical',
      summary: 'Postwar quantum electrodynamics was rebuilt through several approaches. Feynman’s diagrams became extraordinarily influential, while Schwinger’s operator methods and Tomonaga’s independent work were essential parts of the achievement recognised in 1965.',
      atGlance: [
        'Precision experiments exposed discrepancies that older theory could not safely absorb.',
        'Tomonaga, Schwinger, and Feynman developed renormalised approaches to QED.',
        'Dyson showed the equivalence of key formulations and helped make the new framework usable.',
        'A Feynman diagram organises terms in a calculation; it is not a literal film of tiny events.'
      ],
      sections: [
        {
          heading: 'Experiment forces reconstruction',
          paragraphs: [
            'Measurements associated with the Lamb shift and the electron’s magnetic properties sharpened a crisis in quantum electrodynamics. Naive calculations produced divergences, yet the theory’s domain was too successful to discard casually. The problem was to organise finite predictions without hiding arbitrary infinity subtraction.',
            'Tomonaga in Japan, Schwinger in the United States, and Feynman through a different representational route developed methods that contributed to renormalised QED. Their work was later recognised jointly by the Nobel committee.'
          ]
        },
        {
          heading: 'Formalism and visual grammar',
          paragraphs: [
            'Schwinger’s approach was algebraically powerful and closely tied to operator methods. Feynman’s path-integral ideas and diagrams supplied a different grammar for organising perturbative contributions. The visual language lowered some barriers to calculation but did not eliminate the mathematics underneath it.',
            'Freeman Dyson demonstrated equivalence between the approaches in the relevant domain and systematised the diagrammatic expansion. This is a case where historical comparison prevents an educational distortion: the most memorable notation is not automatically the whole theoretical achievement.'
          ]
        },
        {
          heading: 'Do not animate virtual particles literally',
          paragraphs: [
            'Internal lines in a perturbative diagram contribute mathematical factors to an amplitude. Describing them as directly observed particles popping in and out of existence can be a useful first mnemonic but quickly creates false ontology. Different calculational organisations can represent the same observable prediction.',
            'The source-aware label for a diagram is therefore “representation of a calculation.” Historical narrative can explain why the representation spread; standard physics can explain how it contributes to amplitudes; neither requires turning the page into a microscopic movie.'
          ]
        }
      ],
      activity: {
        title: 'One result, three historical routes',
        steps: [
          'Create cards for Tomonaga, Schwinger, Feynman, and Dyson.',
          'Assign each card one documented contribution without ranking personality.',
          'Draw a Feynman-style interaction sketch and label it “calculation organiser.”',
          'List one claim the sketch does not justify about literal microscopic history.'
        ]
      },
      check: {
        question: 'Why should an internal line in a Feynman diagram not automatically be read as an observed particle trajectory?',
        answer: 'It represents a mathematical contribution within a perturbative expansion. It is not itself a detector record or a unique literal history.'
      },
      teacherNote: 'Make all three 1965 laureates visible. A diagram exercise that mentions only Feynman reproduces exactly the historical flattening this article is meant to repair.',
      sources: ['qedNobel', 'schwingerAip', 'qedAip'],
      related: ['physics-x', 'feynman-wheeler', 'solvay-1927']
    },
    {
      id: 'feynman-wheeler',
      category: 'quantum',
      title: 'Feynman and Wheeler in the Quantum Labyrinth',
      deck: 'Mentorship, action at a distance, paths, and a shared willingness to reformulate a problem before solving it.',
      period: '1930s–1950s',
      figures: ['Richard Feynman', 'John Archibald Wheeler'],
      status: 'historical',
      summary: 'Halpern’s The Quantum Labyrinth uses the Feynman–Wheeler relationship to trace modern theoretical physics. Their collaboration and divergence show how speculative reformulation can generate tools even when an original programme does not survive intact.',
      atGlance: [
        'Wheeler supervised Feynman’s Princeton doctoral work.',
        'Their absorber ideas explored direct particle interaction without an independently acting field in the usual form.',
        'Feynman’s action-based route helped prepare his later path-integral formulation.',
        'A failed or limited programme can still produce durable methods and questions.'
      ],
      sections: [
        {
          heading: 'Reformulate before calculating',
          paragraphs: [
            'Wheeler encouraged large conceptual moves: ask whether the standard objects in a theory are indispensable, then rebuild the problem around a different principle. With Feynman, he explored an absorber approach to electrodynamics that treated interactions across spacetime in an unusual way.',
            'The programme faced serious limitations, but the action viewpoint and attention to whole trajectories fed Feynman’s later development. History here is not a clean sequence in which every successful tool was designed for its eventual use.'
          ]
        },
        {
          heading: 'Mentor and independent inventor',
          paragraphs: [
            'Mentorship does not mean a simple transfer of finished ideas. Wheeler provided intellectual permission and a field of ambitious problems; Feynman developed a distinctive calculational style and followed paths that moved beyond the joint work. The relationship is better represented as coupled trajectories than as ownership flowing in one direction.',
            'Halpern’s narrative places those trajectories beside personal and institutional history. Princeton, wartime work, postwar conferences, and later teaching all shape what problems were available and how new methods travelled.'
          ]
        },
        {
          heading: 'Productive failure',
          paragraphs: [
            'Scientific ideas need not be entirely right or entirely sterile. A programme may fail as a complete physical theory while clarifying constraints, exposing a symmetry, or leaving behind a mathematical instrument. Evaluating that mixed legacy requires more than sorting names into winners and losers.',
            'The same lesson applies to the atom debate and cosmology. Historical alternatives should be judged with the evidence then available, while their afterlives should be traced through the questions and techniques they generated.'
          ]
        }
      ],
      activity: {
        title: 'Trace an idea’s afterlife',
        steps: [
          'Choose one abandoned or limited scientific programme.',
          'State its original aim and the evidence that constrained it.',
          'Identify one technique, question, or representation that survived.',
          'Write a verdict that permits mixed success rather than a binary label.'
        ]
      },
      check: {
        question: 'Why can an unsuccessful theoretical programme remain historically important?',
        answer: 'It can expose constraints, reorganise a problem, or generate techniques and questions that remain useful in later successful theories.'
      },
      teacherNote: 'Ask students to distinguish genealogy from credit. An idea can influence later work without being equivalent to the later theory.',
      sources: ['qedAip', 'halpernPublisher'],
      related: ['qed-routes', 'physics-x', 'halpern-bookshelf']
    },
    {
      id: 'big-bang-rivals',
      category: 'cosmology',
      title: 'Cosmic Origins as a Live Argument',
      deck: 'Big Bang and steady-state cosmologies competed through theory, observation, rhetoric, and changing standards of explanatory success.',
      period: 'Twentieth century cosmology',
      figures: ['Georges Lemaître', 'George Gamow', 'Fred Hoyle', 'Hermann Bondi', 'Thomas Gold'],
      status: 'historical',
      summary: 'The history of modern cosmology was not a straight march toward the Big Bang. Expanding-universe models, primordial-nucleosynthesis work, and steady-state alternatives developed under different philosophical and observational pressures.',
      atGlance: [
        'Expansion does not by itself specify a unique cosmic origin model.',
        'Steady-state theory preserved large-scale temporal uniformity through continuous matter creation.',
        'Primordial element abundances and the cosmic microwave background became decisive evidence for a hot early universe.',
        'The phrase “Big Bang” began in a critical broadcast context and outlived that dispute.'
      ],
      sections: [
        {
          heading: 'Several questions inside one origin story',
          paragraphs: [
            'Cosmology asks how expansion evolves, what the universe contained at early times, how elements formed, and whether the large-scale universe changes in character. These questions can be combined into a model, but observations may constrain them at different rates.',
            'Lemaître connected relativity with an expanding cosmos and later a primeval-atom idea. Gamow and collaborators developed hot early-universe nucleosynthesis. Hoyle, Bondi, and Gold advanced a steady-state alternative in which expansion was accompanied by continuous creation, preserving average density.'
          ]
        },
        {
          heading: 'Evidence changes the competition',
          paragraphs: [
            'A strong alternative can make the dominant theory articulate predictions it had treated loosely. Steady-state cosmology sharpened questions about cosmic evolution and source populations. The discovery and interpretation of the cosmic microwave background, together with other observations, strongly favoured a hot early universe.',
            'That outcome should not be projected backward as if every earlier choice were irrational. Theories were compared with a smaller and noisier observational record, and they carried different virtues: temporal symmetry, continuity with known physics, or explanatory reach across nuclear and astronomical phenomena.'
          ]
        },
        {
          heading: 'Narrative without inevitability',
          paragraphs: [
            'Halpern’s Flashes of Creation treats the rivalry through Gamow and Hoyle, making visible the human and rhetorical dimensions without replacing the evidence. The pedagogical gain is to see prediction and observation as events in time rather than a table of facts that always existed.',
            'A source-aware account ends with the present evidential preference while preserving contingency. It can say that the hot Big Bang framework won this historical contest without claiming cosmology has no remaining foundational questions.'
          ]
        }
      ],
      activity: {
        title: 'Evidence arrives in stages',
        steps: [
          'Create separate cards for expansion, element abundances, radio-source evolution, and background radiation.',
          'Order them by when they became available to the debate.',
          'For each stage, write what Big Bang and steady-state advocates could reasonably claim.',
          'Identify the observation that most sharply changed the balance.'
        ]
      },
      check: {
        question: 'Why is cosmic expansion alone not the whole historical case for a hot Big Bang?',
        answer: 'Expansion can be incorporated into more than one cosmological model. Evidence for a hot early phase also comes from phenomena such as primordial abundances and the cosmic microwave background.'
      },
      teacherNote: 'Use a staged evidence reveal. Hindsight disappears when students must update a position after each observation rather than seeing the final case at once.',
      sources: ['halpernPublisher'],
      related: ['multiverse-map', 'halpern-bookshelf', 'history-is-working-physics']
    },
    {
      id: 'multiverse-map',
      category: 'cosmology',
      title: 'The Multiverse Is Not One Hypothesis',
      deck: 'Cosmological domains, quantum branches, and mathematical possibility spaces answer different questions and inherit different tests.',
      period: 'Modern cosmology and foundations',
      figures: ['Hugh Everett III', 'Alan Guth', 'Andrei Linde'],
      status: 'interpretive',
      summary: 'Halpern’s The Allure of the Multiverse follows how a family of multiple-world ideas entered physics. The educational task is to separate mechanisms and evidential programmes instead of treating “the multiverse” as one claim that is simply believed or disbelieved.',
      atGlance: [
        'Quantum branching and inflationary domains arise from different theoretical structures.',
        'A shared word does not create a shared mechanism or common test.',
        'Selection effects can explain observations only relative to a specified ensemble and measure.',
        'Questions of testability, typicality, and explanatory cost remain active.'
      ],
      sections: [
        {
          heading: 'First ask: which multiverse?',
          paragraphs: [
            'In Everett-style quantum interpretation, multiplicity concerns branches of a universal quantum state. In eternal-inflation scenarios, spacetime dynamics can generate causally separated regions. Other proposals treat different mathematical structures or parameter choices as realised. The word “universe” changes role across these uses.',
            'Combining them without mechanism makes criticism and defence equally vague. A good analysis names the theory, its state space, its dynamical rule, the observables available to us, and the measure used to make probabilistic claims.'
          ]
        },
        {
          heading: 'Selection is not prediction by itself',
          paragraphs: [
            'Anthropic or observational selection notes that observers can only arise in compatible conditions. To become quantitatively explanatory, that statement needs an ensemble of possibilities, a probability measure, and a model of the selection condition. Each ingredient can introduce ambiguity.',
            'The resulting argument may still be scientifically useful, but its strength must be evaluated case by case. “Many worlds explain fine tuning” is too compressed to reveal what was calculated and which alternatives were compared.'
          ]
        },
        {
          heading: 'Why allure matters historically',
          paragraphs: [
            'The multiverse attracts because it promises to connect otherwise unexplained parameters, quantum measurement, and cosmic initial conditions. It also generates resistance because inaccessible domains can appear to move explanation away from direct test. The disagreement is partly about how indirect a successful scientific inference may be.',
            'That returns the lab to Mach and Boltzmann. The theories are not identical, but the methodological question rhymes: when do explanatory coherence and indirect consequences justify commitment to entities beyond direct observation? History does not answer automatically; it improves the question.'
          ]
        }
      ],
      activity: {
        title: 'Namespace three multiverses',
        steps: [
          'Create columns for quantum branching, inflationary domains, and parameter ensembles.',
          'For each, name the generating mechanism and candidate evidence.',
          'Cross out any sentence that transfers evidence from one column to another without a bridge.',
          'Write one testability question specific to each proposal.'
        ]
      },
      check: {
        question: 'Why is “Is the multiverse testable?” too underspecified for a single yes-or-no answer?',
        answer: 'Different multiverse proposals have different mechanisms, observables, and indirect consequences. Testability must be assessed for a specified theory rather than for the shared label alone.'
      },
      teacherNote: 'Insist on namespaces. Students should not use evidence for cosmic inflation as automatic evidence for every multiverse interpretation.',
      sources: ['multiverseHarvard', 'halpernPublisher'],
      related: ['big-bang-rivals', 'einstein-bohr', 'mach-boltzmann']
    },
    {
      id: 'human-residue',
      category: 'craft',
      title: 'Blackboards, Notebooks, and Human Residue',
      deck: 'A finished publication is only one layer of scientific work; archives preserve traces of teaching, failed routes, diagrams, and collaboration.',
      period: 'Archive method',
      figures: ['Richard Feynman', 'Albert Einstein', 'Niels Bohr', 'Archivists'],
      status: 'interpretive',
      summary: 'Photographs of blackboards and pages of working notes are compelling because they appear close to thought. They remain artefacts that need date, context, transcription, and provenance before they can carry a historical argument.',
      atGlance: [
        'An artefact’s emotional immediacy is not the same as evidential completeness.',
        'Marginalia and diagrams can reveal working practice that polished papers omit.',
        'Archives preserve selection, arrangement, and metadata as well as objects.',
        'Digital exhibits should link outward to custodial records whenever possible.'
      ],
      sections: [
        {
          heading: 'Why working surfaces fascinate',
          paragraphs: [
            'A blackboard seems to freeze a mind mid-motion. Crossed-out symbols, arrows, and unfinished sentences promise access to process rather than result. That promise is real but limited: without knowing who wrote which mark, when, and for what audience, visual intimacy can outrun interpretation.',
            'Notebooks offer chronology and recurrence, but they too are selective. A calculation may have been copied cleanly after the crucial insight, or a missing page may hold the abandoned route. The historian’s task is to build context around the trace.'
          ]
        },
        {
          heading: 'Archives as active infrastructure',
          paragraphs: [
            'Caltech’s Feynman resources include recordings, lecture notes, and photographs that make teaching inspectable across media. Institutional records for Solvay connect an iconic photograph to proceedings and names. These links turn a circulating image into an addressable historical object.',
            'Metadata is part of the evidence. Date, creator, collection, rights, and custodial history establish what an object can support. A screenshot without that chain may be evocative but difficult to verify or reuse responsibly.'
          ]
        },
        {
          heading: 'Designing a digital tribute',
          paragraphs: [
            'Physics X 95 uses no copied portrait archive. Instead, it builds abstract maps, original prose, and links to institutions that care for the underlying records. This keeps the offline package small and avoids turning historical images into uncredited decoration.',
            'The retro interface is itself an interpretive choice: it evokes a period when multimedia encyclopedias made exploration feel like opening drawers. The design does not claim that 1990s software is historically connected to the physicists. It supplies a playful container whose provenance is declared.'
          ]
        }
      ],
      activity: {
        title: 'Give an image its metadata back',
        steps: [
          'Find a widely reposted historical-physics image.',
          'Locate an institutional record for the original or an early copy.',
          'Record creator, date, collection, caption, and rights information.',
          'Write one claim the image supports and one it cannot support alone.'
        ]
      },
      check: {
        question: 'Why can a blackboard photograph be authentic yet still ambiguous?',
        answer: 'Authenticity establishes the object, but interpretation still requires information about authorship, time, purpose, sequence, and surrounding work.'
      },
      teacherNote: 'Use the Solvay photo because students often know it without knowing its institutional record. The exercise makes provenance materially useful.',
      sources: ['feynmanLectures', 'solvayCern', 'solvayArchives'],
      related: ['physics-x', 'solvay-1927', 'claim-labels']
    }
  ];

  const books = Object.freeze([
    { title: 'The Great Atom Debate', focus: 'Mach, Boltzmann, atomic reality, and the evidential standards of physics.', article: 'mach-boltzmann', url: sources.greatAtomDebatePublisher.url },
    { title: 'The Allure of the Multiverse', focus: 'The history and controversy of multiple-world proposals across cosmology and quantum theory.', article: 'multiverse-map', url: sources.multiverseHarvard.url },
    { title: 'Flashes of Creation', focus: 'George Gamow, Fred Hoyle, and the struggle over cosmic origins.', article: 'big-bang-rivals', url: sources.halpernPublisher.url },
    { title: 'The Quantum Labyrinth', focus: 'Richard Feynman, John Wheeler, and routes through twentieth-century theoretical physics.', article: 'feynman-wheeler', url: sources.qedAip.url },
    { title: 'Einstein’s Dice and Schrödinger’s Cat', focus: 'Einstein, Schrödinger, and the conceptual afterlife of quantum objections.', article: 'einstein-bohr', url: sources.halpernPublisher.url },
    { title: 'Edge of the Universe', focus: 'The frontier of cosmology: dark components, expansion, and the observable horizon.', article: 'big-bang-rivals', url: sources.halpernPublisher.url }
  ]);

  const annusPapers = Object.freeze([
    {
      id: 'light-quanta',
      short: 'Light quanta',
      received: '18 March 1905',
      question: 'How can radiation exchange energy with matter in discrete, frequency-dependent amounts?',
      move: 'Treat radiation energy as localised quanta with energy proportional to frequency.',
      legacy: 'Photoelectric regularities and a path toward the photon concept.',
      expression: 'E = hν'
    },
    {
      id: 'brownian-motion',
      short: 'Brownian motion',
      received: '11 May 1905',
      question: 'What visible statistical motion follows if heat really has a molecular kinetic basis?',
      move: 'Connect diffusion of suspended particles to temperature, viscosity, size, and molecular constants.',
      legacy: 'A quantitative experimental route to atomic scales and Avogadro’s number.',
      expression: '⟨x²⟩ ∝ t'
    },
    {
      id: 'special-relativity',
      short: 'Special relativity',
      received: '30 June 1905',
      question: 'How can electrodynamics and mechanics share a consistent account of inertial motion?',
      move: 'Build kinematics from the relativity principle and invariant light speed.',
      legacy: 'Relativity of simultaneity, Lorentz transformations, and new relations among space and time.',
      expression: 'γ = 1/√(1−β²)'
    },
    {
      id: 'mass-energy',
      short: 'Mass–energy',
      received: '27 September 1905',
      question: 'Does a body’s inertia depend on its energy content?',
      move: 'Derive a change in inertia associated with emitted or absorbed energy.',
      legacy: 'The mass–energy relation later written in its familiar compact form.',
      expression: 'E = mc²'
    }
  ]);

  const solvayParticipants = Object.freeze([
    { name: 'Irving Langmuir', row: 1, seat: 1, laureate: true, field: 'surface chemistry and atomic theory', note: 'Experimental and theoretical work spanning gases, surfaces, and atomic structure.' },
    { name: 'Max Planck', row: 1, seat: 2, laureate: true, field: 'quantum theory', note: 'Introduced the energy quantum in black-body radiation and helped establish quantum theory.' },
    { name: 'Marie Skłodowska Curie', row: 1, seat: 3, laureate: true, field: 'radioactivity', note: 'Pioneered research on radioactivity and was the only participant already awarded Nobel Prizes in two scientific fields.' },
    { name: 'Hendrik Lorentz', row: 1, seat: 4, laureate: true, field: 'electrodynamics and relativity', note: 'Chaired the conference and helped frame the electrodynamic transformations central to relativity.' },
    { name: 'Albert Einstein', row: 1, seat: 5, laureate: true, field: 'relativity and quantum foundations', note: 'Pressed thought-experiment objections to claims of quantum completeness.' },
    { name: 'Paul Langevin', row: 1, seat: 6, laureate: false, field: 'magnetism and statistical physics', note: 'Developed influential work across magnetism, relativity, and Brownian motion.' },
    { name: 'Charles-Eugène Guye', row: 1, seat: 7, laureate: false, field: 'experimental relativity', note: 'Known for precision measurements of electron dynamics relevant to relativistic mass.' },
    { name: 'C. T. R. Wilson', row: 1, seat: 8, laureate: true, field: 'particle detection', note: 'Invented the cloud chamber, making tracks of charged particles experimentally visible.' },
    { name: 'Owen W. Richardson', row: 1, seat: 9, laureate: true, field: 'thermionic emission', note: 'Established quantitative laws for electron emission from heated materials.' },
    { name: 'Peter Debye', row: 2, seat: 1, laureate: true, field: 'molecular physics', note: 'Contributed to dipoles, diffraction, specific heats, and molecular structure.' },
    { name: 'Martin Knudsen', row: 2, seat: 2, laureate: false, field: 'kinetic theory of gases', note: 'Studied rarefied gas flow and molecular transport in the Knudsen regime.' },
    { name: 'William Lawrence Bragg', row: 2, seat: 3, laureate: true, field: 'X-ray crystallography', note: 'Connected X-ray diffraction patterns to crystal structure through Bragg’s law.' },
    { name: 'Hendrik A. Kramers', row: 2, seat: 4, laureate: false, field: 'quantum theory', note: 'Made major contributions to dispersion, correspondence methods, and quantum mechanics.' },
    { name: 'Paul Dirac', row: 2, seat: 5, laureate: true, field: 'quantum mechanics', note: 'Developed transformation theory and later the relativistic quantum equation for the electron.' },
    { name: 'Arthur Compton', row: 2, seat: 6, laureate: true, field: 'X-ray scattering', note: 'Compton scattering supplied major evidence for particle-like energy and momentum in radiation.' },
    { name: 'Louis de Broglie', row: 2, seat: 7, laureate: true, field: 'matter waves', note: 'Proposed wave properties for material particles, central to the conference’s foundations.' },
    { name: 'Max Born', row: 2, seat: 8, laureate: true, field: 'probabilistic quantum mechanics', note: 'Introduced the probability interpretation of the wave function.' },
    { name: 'Niels Bohr', row: 2, seat: 9, laureate: true, field: 'quantum foundations', note: 'Defended complementarity and analysed Einstein’s experimental challenges.' },
    { name: 'Auguste Piccard', row: 3, seat: 1, laureate: false, field: 'high-altitude physics', note: 'Combined physics with instrument design and later pioneered stratospheric exploration.' },
    { name: 'Émile Henriot', row: 3, seat: 2, laureate: false, field: 'atomic and nuclear physics', note: 'Worked on atomic processes, radioactivity, and high-speed laboratory techniques.' },
    { name: 'Paul Ehrenfest', row: 3, seat: 3, laureate: false, field: 'statistical and quantum physics', note: 'Clarified transitions between classical and quantum reasoning and fostered international exchange.' },
    { name: 'Édouard Herzen', row: 3, seat: 4, laureate: false, field: 'physical chemistry', note: 'Belgian scientist associated with thermodynamics and the Solvay scientific community.' },
    { name: 'Théophile de Donder', row: 3, seat: 5, laureate: false, field: 'thermodynamics and relativity', note: 'Developed mathematical work on relativity and chemical thermodynamics.' },
    { name: 'Erwin Schrödinger', row: 3, seat: 6, laureate: true, field: 'wave mechanics', note: 'Formulated wave mechanics and its central evolution equation.' },
    { name: 'Jules-Émile Verschaffelt', row: 3, seat: 7, laureate: false, field: 'thermodynamics', note: 'Worked on critical phenomena, gases, and thermodynamic measurements.' },
    { name: 'Wolfgang Pauli', row: 3, seat: 8, laureate: true, field: 'quantum structure', note: 'Formulated the exclusion principle and shaped the conceptual discipline of quantum theory.' },
    { name: 'Werner Heisenberg', row: 3, seat: 9, laureate: true, field: 'matrix mechanics and uncertainty', note: 'Created matrix mechanics and formulated the uncertainty relation in 1927.' },
    { name: 'Ralph H. Fowler', row: 3, seat: 10, laureate: false, field: 'statistical physics', note: 'Applied statistical mechanics to astrophysics, dense matter, and chemical equilibrium.' },
    { name: 'Léon Brillouin', row: 3, seat: 11, laureate: false, field: 'wave and solid-state physics', note: 'Contributed broadly to wave propagation, quantum theory, and solid-state physics.' }
  ]);

  const timeline = Object.freeze([
    { year: '1860', era: 'atoms', title: 'Maxwell’s molecular speed distribution', detail: 'A statistical distribution enters kinetic theory, relating microscopic motion to macroscopic gas behaviour.', article: 'entropy-probability', source: 'boltzmannOptica' },
    { year: '1872', era: 'atoms', title: 'Boltzmann’s H-theorem', detail: 'Boltzmann develops a kinetic account of approach toward equilibrium and confronts the relation between mechanics and irreversibility.', article: 'entropy-probability', source: 'boltzmannOptica' },
    { year: '1877', era: 'atoms', title: 'Entropy and probability', detail: 'Boltzmann articulates the link between thermodynamic entropy and the multiplicity of microscopic states.', article: 'entropy-probability', source: 'boltzmannOptica' },
    { year: '1890s', era: 'atoms', title: 'Atomism becomes a methodological battleground', detail: 'Mach, Boltzmann, Ostwald, and others contest what unobservable atoms may legitimately explain.', article: 'mach-boltzmann', source: 'greatAtomDebate' },
    { year: '1900', era: 'quantum', title: 'Planck’s quantum step', detail: 'Energy elements enter the black-body radiation problem, opening a path Einstein will radicalise.', article: 'annus-mirabilis', source: 'lightNobelArchive' },
    { year: '18 Mar 1905', era: 'relativity', title: 'Light-quantum paper received', detail: 'Einstein proposes a heuristic quantum view of radiation and applies it to effects including photoelectric emission.', article: 'annus-mirabilis', source: 'einstein1905' },
    { year: '11 May 1905', era: 'atoms', title: 'Brownian-motion paper received', detail: 'Visible diffusion becomes a quantitative consequence of molecular kinetic theory.', article: 'brownian-verdict', source: 'einstein1905' },
    { year: '30 Jun 1905', era: 'relativity', title: 'Special-relativity paper received', detail: 'Kinematics is rebuilt around the relativity principle and invariant light speed.', article: 'light-clock', source: 'einstein1905' },
    { year: '27 Sep 1905', era: 'relativity', title: 'Mass–energy note received', detail: 'Einstein asks whether a body’s inertia depends on its energy content.', article: 'annus-mirabilis', source: 'einstein1905' },
    { year: '1908–1909', era: 'atoms', title: 'Perrin measures Brownian motion', detail: 'Experimental estimates of molecular quantities help establish the discontinuous structure of matter.', article: 'brownian-verdict', source: 'perrinNobel' },
    { year: '1911', era: 'quantum', title: 'First Solvay Conference', detail: 'Leading physicists gather around radiation and quanta, beginning the landmark conference series.', article: 'solvay-1927', source: 'solvayArchives' },
    { year: '24–29 Oct 1927', era: 'quantum', title: 'Fifth Solvay Conference', detail: 'Twenty-nine participants meet on electrons and photons while the interpretation of quantum mechanics remains unsettled.', article: 'solvay-1927', source: 'solvayArchives' },
    { year: '1935', era: 'quantum', title: 'EPR and completeness', detail: 'Einstein, Podolsky, and Rosen sharpen the argument that the quantum-mechanical description may be incomplete.', article: 'einstein-bohr', source: 'feynmanLectures' },
    { year: '1947', era: 'quantum', title: 'Precision results press QED', detail: 'Postwar experiments and the Shelter Island context accelerate reconstruction of quantum electrodynamics.', article: 'qed-routes', source: 'qedAip' },
    { year: '1948–1949', era: 'quantum', title: 'Dyson connects QED formalisms', detail: 'Diagrammatic and operator approaches are shown to express the same renormalised theory in their shared domain.', article: 'qed-routes', source: 'qedAip' },
    { year: '1965', era: 'quantum', title: 'QED Nobel Prize', detail: 'Tomonaga, Schwinger, and Feynman share the physics prize for fundamental work in quantum electrodynamics.', article: 'qed-routes', source: 'qedNobel' },
    { year: '1970s', era: 'craft', title: 'Physics X at Caltech', detail: 'Question-led undergraduate sessions make Feynman’s live problem-solving process part of the lesson.', article: 'physics-x', source: 'physicsXHalpern' },
    { year: '2017', era: 'craft', title: 'The Quantum Labyrinth', detail: 'Halpern publishes his intertwined history of Feynman, Wheeler, and modern theoretical physics.', article: 'feynman-wheeler', source: 'halpernPublisher' },
    { year: '2024', era: 'cosmology', title: 'The Allure of the Multiverse', detail: 'Halpern traces the scientific and cultural history of multiple-world proposals and their controversies.', article: 'multiverse-map', source: 'multiverseHarvard' },
    { year: '2026', era: 'atoms', title: 'The Great Atom Debate', detail: 'Halpern returns to Mach and Boltzmann’s conflict over atoms and the nature of physical reality.', article: 'mach-boltzmann', source: 'greatAtomDebatePublisher' }
  ]);

  const glossary = Object.freeze([
    { term: 'Absorber theory', definition: 'A time-symmetric electrodynamic programme explored by Wheeler and Feynman in which charges interact through the response of other charges rather than an independently acting field in the usual form.', article: 'feynman-wheeler' },
    { term: 'Anthropic selection', definition: 'Reasoning that observations are conditioned by the requirements for observers; quantitative use also needs an ensemble, a measure, and a selection model.', article: 'multiverse-map' },
    { term: 'Atomism', definition: 'The claim that matter has discrete microscopic constituents; in the nineteenth-century debate it was both a scientific model and a contested ontological commitment.', article: 'mach-boltzmann' },
    { term: 'Big Bang', definition: 'The modern framework in which the observable universe evolved from a hot, dense early state; expansion alone is not the entire evidence for that thermal history.', article: 'big-bang-rivals' },
    { term: 'Binomial coefficient', definition: 'The number of ways to choose k objects from n, written C(n,k); it gives the multiplicity of a two-state macrostate in the Entropy Board.', article: 'entropy-probability' },
    { term: 'Bohr complementarity', definition: 'The principle that mutually exclusive experimental arrangements can be required to define and display different classical aspects of a quantum phenomenon.', article: 'einstein-bohr' },
    { term: 'Born rule', definition: 'The rule connecting a quantum state’s amplitude with probabilities of measurement outcomes, conventionally through the squared magnitude of the amplitude.', article: 'solvay-1927' },
    { term: 'Brownian motion', definition: 'Irregular motion of a mesoscopic particle suspended in a fluid, statistically produced by fluctuating molecular impacts.', article: 'brownian-verdict' },
    { term: 'Copenhagen interpretation', definition: 'A broad and historically variable label for approaches associated with Bohr and others; it should not be treated as one perfectly uniform doctrine.', article: 'einstein-bohr' },
    { term: 'Cosmic microwave background', definition: 'Relic thermal radiation from the early universe whose discovery and spectrum became central evidence for a hot Big Bang history.', article: 'big-bang-rivals' },
    { term: 'Diffraction', definition: 'Wave spreading and interference associated with apertures or obstacles; the double-slit exhibit uses the Fraunhofer far-field approximation.', article: 'annus-mirabilis' },
    { term: 'Diffusion coefficient', definition: 'The constant D setting the rate of mean-squared displacement in an ideal diffusion model, with dimensionality determining the numerical factor.', article: 'brownian-verdict' },
    { term: 'EPR argument', definition: 'The 1935 Einstein–Podolsky–Rosen argument using correlated systems to challenge the completeness of quantum mechanics under a stated reality criterion.', article: 'einstein-bohr' },
    { term: 'Ensemble', definition: 'A collection of possible systems or repeated preparations used to define statistical predictions rather than a single microscopic history.', article: 'entropy-probability' },
    { term: 'Entropy', definition: 'A thermodynamic state function; in statistical mechanics it is related to the logarithm of compatible microscopic multiplicity under a specified description.', article: 'entropy-probability' },
    { term: 'Equilibrium', definition: 'A macrostate whose observable properties are stationary and whose compatible microscopic region is typically overwhelmingly large under the relevant constraints.', article: 'entropy-probability' },
    { term: 'Eternal inflation', definition: 'A family of inflationary scenarios in which expansion continues in some regions while ending in others, potentially generating causally separated domains.', article: 'multiverse-map' },
    { term: 'Feynman diagram', definition: 'A graphical device for organising terms in a perturbative quantum-field calculation; it is not automatically a literal particle trajectory.', article: 'qed-routes' },
    { term: 'Gamma factor', definition: 'The Lorentz factor γ = 1/√(1−v²/c²), which relates time, length, energy, and momentum measurements between inertial frames.', article: 'light-clock' },
    { term: 'H-theorem', definition: 'Boltzmann’s kinetic result describing approach toward equilibrium under molecular-chaos assumptions, historically central to debates about reversibility.', article: 'entropy-probability' },
    { term: 'Ideal gas', definition: 'A model of many particles with negligible size and mutual interaction except through idealised collisions, useful for linking molecular motion to pressure and temperature.', article: 'mach-boltzmann' },
    { term: 'Inertial frame', definition: 'A reference frame in which a free body moves at constant velocity; special relativity relates all such frames without selecting a preferred one.', article: 'light-clock' },
    { term: 'Interpretive claim', definition: 'A reasoned statement about significance, motive, or conceptual relationship that is not itself a direct measurement or exact derivation.', article: 'claim-labels' },
    { term: 'Kinetic theory', definition: 'The programme explaining macroscopic properties of matter through the motion and collisions of microscopic constituents.', article: 'mach-boltzmann' },
    { term: 'Light clock', definition: 'A thought-experiment clock in which a light pulse bounces between mirrors, making relativistic time dilation geometrically visible.', article: 'light-clock' },
    { term: 'Light quantum', definition: 'Einstein’s 1905 proposal that radiation energy can behave as localised quanta proportional to frequency, a precursor to the mature photon concept.', article: 'annus-mirabilis' },
    { term: 'Lorentz transformation', definition: 'The coordinate transformation between inertial frames that preserves the spacetime interval and invariant speed of light.', article: 'light-clock' },
    { term: 'Loschmidt objection', definition: 'The reversibility challenge: if microscopic dynamics permits time reversal, why should entropy increase in a preferred temporal direction?', article: 'entropy-probability' },
    { term: 'Macrostate', definition: 'A coarse description using quantities such as particle counts, energy, pressure, or volume while omitting microscopic detail.', article: 'entropy-probability' },
    { term: 'Mass–energy relation', definition: 'The relativistic relationship between energy and inertial mass, commonly written for rest energy as E = mc².', article: 'annus-mirabilis' },
    { term: 'Matrix mechanics', definition: 'A 1925 formulation of quantum mechanics built from noncommuting arrays of observable quantities, associated especially with Heisenberg, Born, and Jordan.', article: 'solvay-1927' },
    { term: 'Mean-squared displacement', definition: 'The ensemble average of squared displacement from a starting point; it grows linearly in time for ordinary ideal diffusion.', article: 'brownian-verdict' },
    { term: 'Microstate', definition: 'A specification of microscopic degrees of freedom compatible with a chosen macroscopic description.', article: 'entropy-probability' },
    { term: 'Multiplicity', definition: 'The number W of microstates compatible with a macrostate; larger multiplicity corresponds to larger Boltzmann entropy under the model.', article: 'entropy-probability' },
    { term: 'Ontology', definition: 'A claim about what entities or structures are physically real, distinct from using them effectively in a calculation.', article: 'mach-boltzmann' },
    { term: 'Path integral', definition: 'A formulation of quantum theory in which amplitudes are assembled from contributions associated with possible paths or histories.', article: 'feynman-wheeler' },
    { term: 'Phase space', definition: 'The space whose coordinates specify a system’s positions and momenta; regions correspond to sets of possible microstates.', article: 'entropy-probability' },
    { term: 'Photoelectric effect', definition: 'Electron emission from matter under illumination, whose frequency dependence was explained by Einstein’s light-quantum relation.', article: 'annus-mirabilis' },
    { term: 'Physics X', definition: 'Feynman’s informal Caltech sessions organised around undergraduate questions and live problem solving rather than a fixed syllabus.', article: 'physics-x' },
    { term: 'Positivism', definition: 'A family of views emphasising observable relations and caution about metaphysical claims; Mach’s position is historically richer than a single later label.', article: 'mach-boltzmann' },
    { term: 'Proper time', definition: 'Elapsed time measured along an object’s own worldline by a clock travelling with it.', article: 'light-clock' },
    { term: 'Quantum electrodynamics', definition: 'The relativistic quantum field theory of electromagnetic interactions, reconstructed in renormalised form through several postwar approaches.', article: 'qed-routes' },
    { term: 'Renormalisation', definition: 'A structured procedure relating calculated parameters to measured quantities so that a quantum field theory yields finite, predictive results.', article: 'qed-routes' },
    { term: 'Schematic model', definition: 'A deliberately limited representation designed to teach a relationship while declaring the mechanisms, scales, or dimensions it omits.', article: 'claim-labels' },
    { term: 'Separability', definition: 'The idea that spatially separated systems possess their own distinct physical states; its role is central in arguments about quantum completeness.', article: 'einstein-bohr' },
    { term: 'Solvay Conference', definition: 'A series of invitation conferences founded through Ernest Solvay’s support; the fifth physics meeting in 1927 focused on electrons and photons.', article: 'solvay-1927' },
    { term: 'Special relativity', definition: 'Einstein’s 1905 framework for inertial frames based on the relativity principle and invariant light speed.', article: 'light-clock' },
    { term: 'Standard physics label', definition: 'This lab’s marker for a conventional equation or model used within explicitly stated assumptions and domain.', article: 'claim-labels' },
    { term: 'Statistical mechanics', definition: 'The framework connecting microscopic states and probabilities with thermodynamic observables and laws.', article: 'entropy-probability' },
    { term: 'Steady-state cosmology', definition: 'A cosmological model preserving large-scale average properties through time despite expansion, historically using continuous matter creation.', article: 'big-bang-rivals' },
    { term: 'Thought experiment', definition: 'A carefully specified imagined arrangement used to expose consequences, tensions, or definitions within a theory.', article: 'einstein-bohr' },
    { term: 'Uncertainty relation', definition: 'A quantum relationship limiting simultaneous sharpness of conjugate quantities, rooted in the mathematical structure rather than ordinary instrument clumsiness.', article: 'solvay-1927' },
    { term: 'Virtual particle', definition: 'Informal language for internal contributions in perturbative quantum field calculations; it should not be treated automatically as a directly observed short-lived particle.', article: 'qed-routes' },
    { term: 'Wave function', definition: 'A mathematical object encoding a quantum state and used with the Born rule to calculate probabilities for outcomes.', article: 'einstein-bohr' },
    { term: 'Wave mechanics', definition: 'Schrödinger’s formulation of quantum mechanics in terms of wave functions and their evolution.', article: 'solvay-1927' }
  ]);

  const lessonPaths = Object.freeze([
    {
      id: 'battle-for-atoms',
      title: 'The Battle for Atoms',
      audience: 'Years 10–12 / general science history',
      duration: '60 minutes',
      summary: 'Move from the Mach–Boltzmann disagreement through statistical counting to Brownian evidence.',
      objectives: ['Distinguish instrumental use of atoms from belief in atomic reality.', 'Explain entropy through multiplicity in a toy model.', 'Describe why Brownian motion supplied a new evidential bridge.'],
      materials: ['Two-sided tokens or coins', 'Atlas access', 'Evidence-card worksheet'],
      sequence: [
        { minutes: 10, title: 'Remove hindsight', article: 'mach-boltzmann', detail: 'Give groups only pre-1905 evidence and have them formulate the strongest atomist and sceptical positions.' },
        { minutes: 12, title: 'Count macrostates', article: 'entropy-probability', atlas: 'entropy-board', detail: 'Compare balanced and extreme multiplicities before using entropy language.' },
        { minutes: 12, title: 'Model a gas', atlas: 'kinetic-gas', detail: 'Predict how temperature, particle number, and volume change the wall-collision pressure proxy.' },
        { minutes: 14, title: 'Introduce Brownian evidence', article: 'brownian-verdict', atlas: 'brownian-microscope', detail: 'Separate the schematic path from Einstein’s quantitative bridge and Perrin’s measurements.' },
        { minutes: 12, title: 'Issue a verdict', detail: 'Write what later evidence changed and which of Mach’s methodological questions remain useful.' }
      ],
      assessment: ['What observation distinguished atomic reality from atoms as merely convenient notation?', 'Why does S = k ln W require a declared macrostate description?']
    },
    {
      id: 'einstein-1905-studio',
      title: 'Einstein’s 1905 Studio',
      audience: 'Senior secondary / undergraduate foundation',
      duration: '70 minutes',
      summary: 'Compare the four annus mirabilis papers by problem, method, and experimental afterlife.',
      objectives: ['Name the distinct problem addressed by each 1905 paper.', 'Calculate time dilation for a simple inertial light clock.', 'Separate the Nobel citation from popular retrospective summaries.'],
      materials: ['Calculator', 'Four paper cards', 'Atlas access'],
      sequence: [
        { minutes: 10, title: 'Map the four papers', article: 'annus-mirabilis', atlas: 'annus-map', detail: 'Select each node and classify its main reasoning move.' },
        { minutes: 12, title: 'Follow molecular evidence', article: 'brownian-verdict', detail: 'Connect the Brownian paper to the earlier atom debate.' },
        { minutes: 20, title: 'Derive the light clock', article: 'light-clock', atlas: 'light-clock', detail: 'Calculate gamma at three velocities and verify the geometric result.' },
        { minutes: 13, title: 'Light quanta', atlas: 'double-slit', detail: 'Compare quantum energy exchange with a standard wave-interference pattern without claiming either visual is the whole ontology.' },
        { minutes: 15, title: 'Write the Nobel caption', detail: 'Draft a one-sentence caption that accurately names the result cited by the 1921 prize.' }
      ],
      assessment: ['Why are Brownian motion and special relativity methodologically different achievements?', 'At β = 0.8, calculate gamma and interpret one proper second.']
    },
    {
      id: 'inside-solvay',
      title: 'Inside Solvay 1927',
      audience: 'Years 11–12 / history and philosophy of science',
      duration: '55 minutes',
      summary: 'Turn the famous group photograph back into a conference of distinct people, programmes, and foundational questions.',
      objectives: ['Identify the official topic and structure of the conference.', 'Distinguish Einstein’s completeness concerns from denial of quantum predictions.', 'Use an institutional record to source a circulated historical image.'],
      materials: ['Solvay map', 'Premise-map worksheet', 'Reference Desk access'],
      sequence: [
        { minutes: 10, title: 'Source the image', article: 'human-residue', detail: 'Locate the CERN and Solvay institutional records rather than relying on a reposted caption.' },
        { minutes: 12, title: 'Restore the participants', article: 'solvay-1927', atlas: 'solvay-map', detail: 'Select people from each row and compare research programmes.' },
        { minutes: 12, title: 'Filter and critique', atlas: 'solvay-map', detail: 'Use the laureate filter, then explain what the filter erases.' },
        { minutes: 13, title: 'Map the premises', article: 'einstein-bohr', detail: 'Separate completeness, separability, and measurement context.' },
        { minutes: 8, title: 'Replace the slogan', detail: 'Write a two-sentence account of the debate with no dice or God quotation.' }
      ],
      assessment: ['Why is the group photograph insufficient evidence for the content of the conference?', 'State Einstein’s concern without saying he rejected all quantum success.']
    },
    {
      id: 'routes-through-qed',
      title: 'Routes Through QED',
      audience: 'Undergraduate / advanced secondary',
      duration: '60 minutes',
      summary: 'Use biography and representation to study how several approaches converged on renormalised quantum electrodynamics.',
      objectives: ['Name the three 1965 QED laureates.', 'Explain Dyson’s role in connecting formalisms.', 'Interpret a diagram as a calculation organiser rather than a literal movie.'],
      materials: ['Contributor cards', 'Blank interaction diagrams', 'Calculator or whiteboard'],
      sequence: [
        { minutes: 10, title: 'Start with the experimental pressure', article: 'qed-routes', detail: 'Identify why old calculations were inadequate.' },
        { minutes: 12, title: 'Compare formalisms', detail: 'Assign Tomonaga, Schwinger, Feynman, and Dyson distinct contribution cards.' },
        { minutes: 12, title: 'Trace the mentorship route', article: 'feynman-wheeler', detail: 'Follow what survived from earlier action-based work.' },
        { minutes: 12, title: 'Think in public', article: 'physics-x', detail: 'Run a short question-led explanation of what an internal diagram line means.' },
        { minutes: 14, title: 'Audit the animation temptation', detail: 'Rewrite three literal virtual-particle claims as statements about amplitudes and calculation.' }
      ],
      assessment: ['Why did the visual success of Feynman diagrams not make Schwinger and Tomonaga historically optional?', 'What does an internal line justify saying?']
    },
    {
      id: 'halpern-history-workshop',
      title: 'The Halpern History Workshop',
      audience: 'Educators / science communicators',
      duration: '50 minutes',
      summary: 'Build a short, source-aware history-of-physics lesson from a relationship, an archive, and an honest model.',
      objectives: ['Use a personal relationship to illuminate rather than replace a concept.', 'Match evidence type to claim type.', 'Design a model with an explicit non-claim.'],
      materials: ['One Halpern book synopsis', 'One institutional archive item', 'Four-label audit sheet'],
      sequence: [
        { minutes: 8, title: 'Choose a relationship', article: 'halpern-bookshelf', detail: 'Select Mach–Boltzmann, Einstein–Bohr, Feynman–Wheeler, or Gamow–Hoyle.' },
        { minutes: 10, title: 'Write the conceptual stake', article: 'history-is-working-physics', detail: 'State what becomes clearer through the relationship.' },
        { minutes: 10, title: 'Anchor one fact', article: 'human-residue', detail: 'Attach an institutional or primary source with usable metadata.' },
        { minutes: 12, title: 'Add one model', article: 'claim-labels', detail: 'Choose an atlas exhibit and write its assumptions and non-claims.' },
        { minutes: 10, title: 'Peer-audit the labels', detail: 'A partner identifies one sentence where narrative confidence exceeds evidence.' }
      ],
      assessment: ['What does the human relationship explain that the equation alone does not?', 'Which sentence in your lesson is interpretive, and how is it marked?']
    }
  ]);

  const atlas = Object.freeze([
    { id: 'kinetic-gas', title: 'Mach–Boltzmann Gas Chamber', namespace: 'Ideal-gas teaching model', status: 'schematic', description: 'Point particles collide elastically with a variable chamber. A wall-impulse proxy exposes the directions predicted by kinetic theory without claiming laboratory units.', article: 'mach-boltzmann', controls: ['temperature', 'particles', 'volume', 'pause', 'reset'] },
    { id: 'entropy-board', title: 'Boltzmann Entropy Board', namespace: 'Exact finite combinatorics', status: 'standard', description: 'Count the microstates of a two-state macrostate and compare logarithmic entropy across particle splits.', article: 'entropy-probability', controls: ['tokens', 'split'] },
    { id: 'brownian-microscope', title: 'Brownian Microscope', namespace: 'Random-walk teaching model', status: 'schematic', description: 'A seeded random-force model displays a grain trajectory, repeatability controls, and mean-squared displacement.', article: 'brownian-verdict', controls: ['temperature', 'trace', 'pause', 'reset'] },
    { id: 'annus-map', title: '1905 Paper Constellation', namespace: 'Historical concept map', status: 'historical', description: 'Select the four annus mirabilis papers by question, conceptual move, expression, and later evidential route.', article: 'annus-mirabilis', controls: ['paper'] },
    { id: 'light-clock', title: 'Einstein Light Clock', namespace: 'Special-relativistic geometry', status: 'standard', description: 'Compare one proper tick with its moving-frame description while the Lorentz factor is calculated from β = v/c.', article: 'light-clock', controls: ['velocity', 'pause'] },
    { id: 'solvay-map', title: 'Solvay 1927 Seating Map', namespace: 'Historical participant map', status: 'historical', description: 'Explore all 29 participants in the institutional photograph, with a deliberately reversible Nobel-laureate filter.', article: 'solvay-1927', controls: ['participant', 'filter'] },
    { id: 'double-slit', title: 'Wave Interference Bench', namespace: 'Fraunhofer approximation', status: 'standard', description: 'Explore a monochrome double-slit intensity profile as wavelength, slit separation, and slit width change.', article: 'annus-mirabilis', controls: ['wavelength', 'separation', 'width'] }
  ]);

  return Object.freeze({
    edition: '1.0.0',
    title: 'Physics X 95 — History Lab',
    subtitle: 'People, arguments, experiments',
    claimLabels,
    sources,
    categories,
    articles: Object.freeze(articles),
    books,
    annusPapers,
    solvayParticipants,
    timeline,
    glossary,
    lessonPaths,
    atlas
  });
});
