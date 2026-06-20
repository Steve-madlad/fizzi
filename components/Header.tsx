import { FizziLogo } from './svg/FizziLogo';

type Props = {};

export default function Header({}: Props) {
  return (
    <div className="just-center abs-x-center cursor p-4">
      <FizziLogo className="z-10 h-20 text-sky-800" />
    </div>
  );
}
