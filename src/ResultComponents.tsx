import { Result, Button } from "antd";

export function ResultEntityNotFound(props: { targetEntity: string }) {
  const title = `Failed to find ${props.targetEntity}`;
  const subTitle = `No ${props.targetEntity} found for given parameters`;

  return <Result status="404" title={title} subTitle={subTitle} />;
}

export function ResultFetchError(props: {}) {
  return (
    <Result
      status="500"
      title="Failure!"
      subTitle="Maybe something happened, try refreshing!"
    />
  );
}
