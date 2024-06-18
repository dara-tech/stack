import { Select, useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import Loading from "../components/Loading";
import { useAnalytics } from "../hooks/post-hook";
import useStore from "../store";
import clsx from "clsx";
import Stats from "../components/Stats";
import Graph from "../components/Graph";
import { useTranslation } from "react-i18next";

const Analytics = () => {
  const { colorScheme } = useMantineColorScheme();

  const { user } = useStore();
  const [numOfDays, setNumberOfDays] = useState(28);
  const [visible, { toggle }] = useDisclosure(false);
  const { data, isPending, mutate } = useAnalytics(toast, toggle, user?.token);

  const theme = colorScheme === "dark";

  useEffect(() => {
    mutate(numOfDays);
  }, [numOfDays]);

  const {t} = useTranslation();

  return (
    <div className='w-full'>
      <div className='w-full flex items-center justify-between mb-3'>
        <p
          className={clsx(
            "text-xl font-semibold ",
            theme ? "text-white" : "text-slate-700"
          )}
        >
          {t("Analytics")}
        </p>

        <Select
          // label='Select Range'
          defaultValue={t('28 days')}
          placeholder='Range'
          data={[t("7 days"), t("28 days"),t("100 days"), t("365 days")]}
          onChange={(val) => setNumberOfDays(val?.split(" "[0]))}
        />
      </div>

      <Stats dt={data} />

      <div className='w-full py-8'>
        <p className='py-5 text-base font-medium '>
          {t("View Stats for last")} {numOfDays} 
        </p>
        <Graph dt={data?.viewStats} />
      </div>

      <div className='w-full py-8'>
        <p className='py-5 text-base font-medium '>
        {t("Followers Stats for last")} {numOfDays} 
        </p>
        <Graph dt={data?.followersStats} />
      </div>

      <Loading visible={isPending} />

      <Toaster richColors />
    </div>
  );
};

export default Analytics;
