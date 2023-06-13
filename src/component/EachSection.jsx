import MenuIcon from "@mui/icons-material/Menu";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AntSwitch from "./AntSwitch";
import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const EachSection = (props) => {
  const [inEditMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(props.section.name);

  const onCheckHandler = (event) => {
    props.onChangeSectionSelect(props.section.id, event.target.checked);
  };

  const SaveButton = (
    <Button
      onClick={() => {
        props.onChangeSectionName(props.section.id, inputValue.trim());
        setEditMode(false);
      }}
      className="hover:text-[#8A4893]"
    >
      Save
    </Button>
  );
  const editButton = (
    <EditOutlinedIcon
      onClick={() => {
        setEditMode(true);
      }}
      className="cursor-pointer"
    />
  );

  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
    },
  }));

  return (
    <div
      ref={props.inpref}
      {...props.dragProps}
      className="border-b-[1px] border-[#d4d4d4] flex items-center justify-between py-4"
    >
      <span className="flex items-center gap-3">
        <div {...props.dragHandleProps}>
          <MenuIcon />
        </div>
        <BootstrapTooltip title={props.section.description}>
          <InfoOutlinedIcon className="cursor-pointer" />
        </BootstrapTooltip>
      </span>
      {inEditMode ? (
        <Input
          onChangeHandler={(event) => {
            setInputValue(event.target.value);
          }}
          value={inputValue}
        />
      ) : (
        <p className="w-full ml-2">{props.section.name}</p>
      )}
      <span className="flex items-center gap-4">
        {inEditMode ? SaveButton : editButton}
        <AntSwitch
          checked={props.section.selected}
          checkHandler={onCheckHandler}
        />
      </span>
    </div>
  );
};

export default EachSection;
