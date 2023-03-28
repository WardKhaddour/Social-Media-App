type ButtonTypes = 'submit' | 'button' | 'reset' | undefined;

const PrimaryButton = (props: { text: string; type: ButtonTypes }) => {
  return (
    <div className="form-control">
      <button
        type={props.type || 'button'}
        className="btn btn-primary auth-content__action--primary"
      >
        {props.text}
      </button>
    </div>
  );
};

export default PrimaryButton;
