import { Alert } from "@/components/Alert";

export const Tips = () => {
  return (
    <Alert severity="error">
      No enough <b>DAIx</b>?
      <br />
      Wrap some <b>DAI</b> on the&nbsp;
      <a
        href="https://app.superfluid.finance/wrap?upgrade"
        target="_blank"
      >
        Superfluid
      </a>
      &nbsp;page and then back.
    </Alert>
  );
};
