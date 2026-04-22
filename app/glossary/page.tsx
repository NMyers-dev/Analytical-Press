import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Glossary",
  description:
    "Plain-language definitions for the soccer and data-analysis terms we use on HalfSpace."
};

type Term = {
  id: string;
  term: string;
  aka?: string[];
  definition: string;
};

const TERMS: Term[] = [
  {
    id: "xg",
    term: "xG",
    aka: ["Expected goals"],
    definition:
      "The probability that a given shot becomes a goal, computed from features like distance, angle, assist type, and situation. Summed across shots it describes the 'quality' of a team or player's scoring chances, independent of finishing luck."
  },
  {
    id: "xa",
    term: "xA",
    aka: ["Expected assists"],
    definition:
      "The xG of the shot you created with a pass. High-xA players are generating valuable shots for teammates even when the finisher misses."
  },
  {
    id: "xt",
    term: "xT",
    aka: ["Expected threat"],
    definition:
      "A pitch-location value model. Every zone on the pitch has a 'threat' value equal to the probability that possessing the ball there leads to a goal within a few actions. Moving the ball into higher-value zones earns xT."
  },
  {
    id: "ppda",
    term: "PPDA",
    aka: ["Passes per defensive action"],
    definition:
      "A pressing intensity metric: the number of passes the opposition is allowed to complete in your pressing zone per defensive action (tackle, interception, foul, etc.) you make there. Lower PPDA = more aggressive press."
  },
  {
    id: "progressive-pass",
    term: "Progressive pass",
    definition:
      "A completed pass that moves the ball meaningfully closer to the opponent's goal. Definitions vary, but a common threshold is: moves the ball at least 10 meters toward goal from its furthest point in the last six passes, or any pass into the penalty area."
  },
  {
    id: "progressive-carry",
    term: "Progressive carry",
    definition:
      "Same idea as a progressive pass but with your feet — a ball-carry that advances the ball meaningfully toward the opposing goal without passing."
  },
  {
    id: "half-space",
    term: "Half-space",
    definition:
      "The vertical channel of the pitch between the central corridor and the wing, roughly aligned with the edge of the penalty box. A player in the half-space can receive line-breaking passes, thread balls in behind, or rotate outside to overload the wing. The publication's namesake."
  },
  {
    id: "false-nine",
    term: "False nine",
    definition:
      "A center-forward who deliberately drops off the front line to receive with their back to goal, dragging a center-back out of position and opening space for runners from midfield. Messi under Guardiola is the canonical example."
  },
  {
    id: "inverted-fullback",
    term: "Inverted fullback",
    definition:
      "A fullback who drifts into central midfield when their team has the ball rather than pushing up the wing, creating numerical overload in the middle and a back-three shape out of possession. See Zinchenko, Walker, and Alphonso Davies for different flavors of the role."
  },
  {
    id: "low-block",
    term: "Low block",
    definition:
      "A defensive shape where both banks of the defending team sit very deep — usually in or around their own penalty area — inviting pressure and looking to spring counterattacks. Common against superior possession sides."
  },
  {
    id: "high-line",
    term: "High line",
    definition:
      "The defensive line is positioned high up the pitch, compressing the playing area and squeezing opposition attackers into offside positions. Makes the team vulnerable to balls in behind but restricts space between the lines."
  },
  {
    id: "gegenpressing",
    term: "Gegenpressing",
    aka: ["Counter-press"],
    definition:
      "Coordinated pressure applied immediately after losing the ball, aimed at regaining possession high up the pitch while the opponent is still transitioning. Klopp's Dortmund and Liverpool teams built their identity on it."
  },
  {
    id: "xga",
    term: "xGA",
    aka: ["Expected goals against"],
    definition:
      "The xG of the shots taken against you. Summed across a match or season, it describes the quality of chances your defense allows, independent of whether the opponent finished them or not."
  },
  {
    id: "npxg",
    term: "npxG",
    aka: ["Non-penalty xG"],
    definition:
      "xG with penalty kicks stripped out. A better single number for judging open-play chance creation, since penalty shots (~76% conversion) dominate a player's raw xG total."
  },
  {
    id: "pass-network",
    term: "Pass network",
    definition:
      "A visualization where each player is a node (positioned at their average location) and each pass between two players is an edge (weighted by frequency). Reveals a team's shape in possession and who plays with whom."
  },
  {
    id: "set-piece",
    term: "Set piece",
    definition:
      "Any restart of play from a dead ball — corners, free kicks, throw-ins, and penalties. Set-piece routines are increasingly the domain of dedicated coaches; a team's set-piece xG can account for a third or more of its scoring."
  }
];

export default function GlossaryPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-12">
      <header className="reveal">
        <p className="eyebrow">Reference</p>
        <h1 className="headline mt-2 text-4xl md:text-6xl">Glossary</h1>
        <p className="mt-4 text-lg italic text-[color:var(--color-ink-soft)]">
          Plain-language definitions for the terms we use often. If we cite a
          concept in a piece, it probably lives here too. Missing something?
          Tell us and we&apos;ll add it.
        </p>
      </header>

      <div className="hairline my-10" />

      <nav className="reveal reveal-delay-1" aria-label="Glossary jump links">
        <p className="eyebrow mb-3">Jump to</p>
        <ul className="flex flex-wrap gap-2">
          {TERMS.map((t) => (
            <li key={t.id}>
              <Link
                href={`#${t.id}`}
                className="inline-block border border-[color:var(--color-rule)] px-2 py-1 text-xs uppercase tracking-widest transition-colors duration-300 hover:border-[color:var(--color-pitch)] hover:text-[color:var(--color-pitch)]"
              >
                {t.term}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <dl className="mt-12 space-y-10 reveal reveal-delay-2">
        {TERMS.map((t) => (
          <div
            key={t.id}
            id={t.id}
            className="scroll-mt-24 border-t border-[color:var(--color-rule)] pt-6"
          >
            <dt>
              <h2 className="headline text-2xl md:text-3xl">{t.term}</h2>
              {t.aka && t.aka.length > 0 && (
                <p className="mt-1 text-sm italic text-[color:var(--color-ink-soft)]">
                  Also: {t.aka.join(", ")}
                </p>
              )}
            </dt>
            <dd className="mt-3 text-lg leading-relaxed">
              {t.definition}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
