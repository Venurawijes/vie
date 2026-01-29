import BranchCard from '../components/branch-card';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/core/context/hooks';
import { fetchBranchesAsync } from '../store/dashboard.slice';
import Loader from '@/shared/components/loader';

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const { company } = useAppSelector((state) => state.auth);
  const { branches, isLoading } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    if (company?.id && branches.length === 0) {
      fetchBranches(company.id, company.url_prefix);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company, branches]);

  const fetchBranches = async (companyId: number, prefix: string) => {
    await dispatch(fetchBranchesAsync({ companyId, prefix })).unwrap();
  };

  return (
    <div className="min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {isLoading && <Loader />}

      {!isLoading && (
        <>
          <div className="flex flex-col items-center text-center gap-8">
            <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Select The Branch To Manage Your Orders
            </h3>
          </div>

          <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {branches?.length > 0 &&
              branches.map((branch) => <BranchCard key={branch.id} branch={branch} />)}
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;
