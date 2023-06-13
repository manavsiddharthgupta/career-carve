import React, { useState } from "react";
import { allSecArr } from "./lib/allSectionDetails";
import EachSection from "./component/EachSection";
import Button from "./component/Button";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {
  const [allSectionState, setAllSectionState] = useState(allSecArr);

  const onChangeSectionNameHandler = (id, value) => {
    setAllSectionState((state) => {
      const index = state.findIndex((sec) => {
        return sec.id === id;
      });

      const filteredSec = { ...state[index] };
      const newAllSectionState = [
        ...state.slice(0, index),
        { ...filteredSec, name: value },
        ...state.slice(index + 1),
      ];

      return [...JSON.parse(JSON.stringify(newAllSectionState))];
    });
  };

  const onChangeSectionSelectHandler = (id, value) => {
    setAllSectionState((state) => {
      const index = state.findIndex((sec) => {
        return sec.id === id;
      });

      console.log(index);
      const filteredSec = { ...state[index] };
      console.log(filteredSec);
      const newAllSectionState = [
        ...state.slice(0, index),
        { ...filteredSec, selected: value },
        ...state.slice(index + 1),
      ];
      console.log(newAllSectionState);

      return [...JSON.parse(JSON.stringify(newAllSectionState))];
    });
  };

  const onDragEnd = (param) => {
    const srcInd = param.source.index;
    const destInd = param.destination.index;

    setAllSectionState((state) => {
      const newAllSectionState = [...JSON.parse(JSON.stringify(state))];

      newAllSectionState.splice(
        destInd,
        0,
        newAllSectionState.splice(srcInd, 1)[0]
      );

      return [...JSON.parse(JSON.stringify(newAllSectionState))];
    });
  };

  return (
    <div className="my-8 px-4">
      <h1 className="text-center text-2xl">Select your sections</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-1">
          {(provided) => {
            return (
              <section
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="mt-4 max-w-4xl mx-auto"
              >
                {allSectionState.map((section, ind) => {
                  return (
                    <Draggable
                      key={section.id}
                      draggableId={`draggable-${section.id}`}
                      index={ind}
                    >
                      {(provided) => {
                        return (
                          <EachSection
                            inpref={provided.innerRef}
                            dragProps={{ ...provided.draggableProps }}
                            dragHandleProps={{ ...provided.dragHandleProps }}
                            onChangeSectionName={onChangeSectionNameHandler}
                            onChangeSectionSelect={onChangeSectionSelectHandler}
                            section={section}
                          />
                        );
                      }}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </section>
            );
          }}
        </Droppable>
      </DragDropContext>
      <div className="flex justify-center">
        <Button
          onClick={() => {
            console.log(allSectionState);
          }}
          className="px-24 py-2 mt-4 bg-[#8A4893] text-white rounded-lg"
        >
          Save and Next
        </Button>
      </div>
    </div>
  );
}

export default App;
