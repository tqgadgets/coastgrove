import {
  BrickWall,
  Droplets,
  Flower2,
  Leaf,
  Lightbulb,
  PencilRuler,
  Scissors,
} from 'lucide-react';

const ICON_MAP = {
  PencilRuler,
  Leaf,
  Droplets,
  BrickWall,
  Flower2,
  Scissors,
  Lightbulb,
};

export default function ServiceIcon({ name, size = 24 }) {
  const Icon = ICON_MAP[name] || Leaf;
  return <Icon size={size} strokeWidth={1.75} aria-hidden="true" />;
}
