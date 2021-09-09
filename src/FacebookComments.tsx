export default function FacebookComments(props: { href: string }) {
  return (
    <div
      className="fb-comments"
      data-href={props.href}
      data-width="100%"
      data-numposts="5"
    ></div>
  );
}
