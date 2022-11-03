import { useRouter } from "next/router";
import { Loading } from "../components/Loading";
import { Sponsor } from "../components/Sponsor";

export default function Foo() {
  const router = useRouter();
  const { addr }: any = router.query;

  if (!addr) {
    return <Loading />
  }

  return <Sponsor addr={addr} />;
}
