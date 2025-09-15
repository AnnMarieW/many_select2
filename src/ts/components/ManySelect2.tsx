import React, { useEffect, useState } from "react";
import { DashComponentProps } from "../props";

const MAX_DISPLAYED_VALUES = 2;
const groceries = [
  "🍎 Apples",
  "🍌 Bananas",
  "🥦 Broccoli",
  "🥕 Carrots",
  "🍫 Chocolate",
];

type Props = {} & DashComponentProps;

const ManySelect = ({
  id,
  mantine,
}: Props & { mantine: any }) => {
  const {
    CheckIcon,
    Combobox,
    Group,
    Input,
    Pill,
    PillsInput,
    useCombobox,
  } = mantine;

  const [value, setValue] = useState<string[]>([]);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });

  const handleValueSelect = (val: string) =>
    setValue((current) =>
      current.includes(val)
        ? current.filter((v) => v !== val)
        : [...current, val],
    );

  const handleValueRemove = (val: string) =>
    setValue((current) => current.filter((v) => v !== val));

  const values = value
    .slice(
      0,
      MAX_DISPLAYED_VALUES === value.length
        ? MAX_DISPLAYED_VALUES
        : MAX_DISPLAYED_VALUES - 1,
    )
    .map((item) => (
      <Pill
        key={item}
        withRemoveButton
        onRemove={() => handleValueRemove(item)}
      >
        {item}
      </Pill>
    ));

  const options = groceries.map((item) => (
    <Combobox.Option value={item} key={item} active={value.includes(item)}>
      <Group gap="sm">
        {value.includes(item) ? <CheckIcon size={12} /> : null}
        <span>{item}</span>
      </Group>
    </Combobox.Option>
  ));

  return (
    <div id={id}>
      <Combobox
        store={combobox}
        onOptionSubmit={handleValueSelect}
        withinPortal={false}
      >
        <Combobox.DropdownTarget>
          <PillsInput pointer onClick={() => combobox.toggleDropdown()}>
            <Pill.Group>
              {value.length > 0 ? (
                <>
                  {values}
                  {value.length > MAX_DISPLAYED_VALUES && (
                    <Pill>
                      +{value.length - (MAX_DISPLAYED_VALUES - 1)} more
                    </Pill>
                  )}
                </>
              ) : (
                <Input.Placeholder>Pick one or more values</Input.Placeholder>
              )}

              <Combobox.EventsTarget>
                <PillsInput.Field
                  type="hidden"
                  onBlur={() => combobox.closeDropdown()}
                  onKeyDown={(event) => {
                    if (event.key === "Backspace") {
                      event.preventDefault();
                      handleValueRemove(value[value.length - 1]);
                    }
                  }}
                />
              </Combobox.EventsTarget>
            </Pill.Group>
          </PillsInput>
        </Combobox.DropdownTarget>

        <Combobox.Dropdown>
          <Combobox.Options>{options}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  );
};

ManySelect.defaultProps = {};

export default function ManySelectLoader(props: Props) {
  const [mantine, setMantine] = useState<any>(null);

  useEffect(() => {
    import("@mantine/core").then(setMantine);
  }, []);

  if (!mantine) {
    return null;
  }

  return <ManySelect {...props} mantine={mantine} />;
}