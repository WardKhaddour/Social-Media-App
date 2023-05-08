import {
  MouseEvent,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import './Select.scss';

interface IOption {
  name: string;
  _id: string;
}

interface IProps {
  title?: string;
  options: IOption[];
  prevSelections?: IOption[];
}

export interface ISelectionRef {
  getSelections(): string[];
  clearSelections(): void;
}

const Select = forwardRef<ISelectionRef, IProps>((props, ref) => {
  const [selections, setSelections] = useState(new Set<string>());
  const categoriesRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (props.prevSelections) {
      categoriesRef.current?.querySelectorAll('li').forEach(child => {
        if (
          child.dataset.id &&
          props.prevSelections?.findIndex(el => el._id === child.dataset.id) !==
            -1
        )
          child.classList.add('selected');
      });
      setSelections(new Set(props.prevSelections.map(el => el._id)));
    }
  }, [props.prevSelections]);

  useImperativeHandle(ref, () => ({
    getSelections() {
      return Array.from(selections);
    },
    clearSelections() {
      categoriesRef.current?.querySelectorAll('li').forEach(child => {
        child.classList.remove('selected');
      });
      setSelections(new Set());
    },
  }));

  const handleSelection = (event: MouseEvent<HTMLUListElement>) => {
    const target = event.target as HTMLElement;

    if (target.tagName !== 'LI') {
      return;
    }

    target.classList.toggle('selected');

    if (target.classList.contains('selected')) {
      setSelections(prevState => {
        const currentSet = new Set(prevState);
        if (target.dataset.id) {
          currentSet.add(target.dataset.id);
        }
        return currentSet;
      });
    } else if (!target.classList.contains('selected')) {
      setSelections(prevState => {
        const currentSet = new Set(prevState);
        if (target.dataset.id) {
          currentSet.delete(target.dataset.id);
        }
        return currentSet;
      });
    }
  };

  return (
    <div className="select">
      <h2 className="select__title">{props.title}</h2>
      <ul
        className="select__list"
        onClick={handleSelection}
        ref={categoriesRef}
      >
        {props.options?.map(option => (
          <li
            key={option._id}
            data-id={option._id}
            className="select__list--item"
          >
            {option.name}
          </li>
        ))}
      </ul>
    </div>
  );
});
export default Select;
