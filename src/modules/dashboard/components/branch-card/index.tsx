import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/components/ui/button';
import { IBranch } from '@/shared/interfaces/branch.interface';
import { useAppDispatch } from '@/core/context/hooks';
import { setIsMute } from '@/shared/store/shared.slice';

interface Props {
  branch: IBranch;
}

const BranchCard = ({ branch }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onBranchClick = () => {
    dispatch(setIsMute(false));
    navigate(`/orders/${branch.id}`);
  };

  return (
    <div className="p-6 rounded-lg border bg-card">
      <h3 className="text-xl font-semibold mb-2">{branch.name}</h3>
      <Button onClick={onBranchClick} className="w-full">
        Select Branch
      </Button>
    </div>
  );
};

export default BranchCard;
