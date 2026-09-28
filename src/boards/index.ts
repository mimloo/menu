import { BrunchMains } from './BrunchMains';
import { BuildABowl } from './BuildABowl';
import { SidesSips } from './SidesSips';

export const boards = [
  { id: 'brunch-mains', title: 'All Day Brunch & Mains', Component: BrunchMains },
  { id: 'bowls', title: 'Bowls & Sensory Friendly', Component: BuildABowl },
  { id: 'sides-sips', title: 'Lil’ Sides & Sips', Component: SidesSips },
] as const;

export type BoardId = (typeof boards)[number]['id'];
