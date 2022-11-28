import { useRouter } from "next/router";
import { Loading } from "@/components/Loading";
import { NetworkT, Sponsor } from "@/components/Sponsor";

export default function Foo() {
  const router = useRouter();
  const { addr, network }: { addr?: string; network?: NetworkT } = router.query;

  if (!addr) {
    return <Loading />
  }

  return <Sponsor addr={addr} network={network} />;
}
