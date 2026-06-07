import { FizziLogo } from './FizziLogo';

type Props = {};

export default function Header({}: Props) {
  return (
    <div className="just-center p-4 abs-x-center cursor">
      <FizziLogo className="z-10 h-20 text-sky-800" />
    </div>
  );
}
