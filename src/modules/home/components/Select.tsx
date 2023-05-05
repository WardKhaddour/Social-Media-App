import {
  MouseEvent,
  forwardRef,
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
}

export interface ISelectionRef {
  getSelections(): string[];
  clearSelections(): void;
}

const Select = forwardRef<ISelectionRef, IProps>((props, ref) => {
  const [selections, setSelections] = useState(new Set<string>());
  const categoriesRef = useRef<HTMLUListElement>(null);
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
