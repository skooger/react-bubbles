import React, { useState } from "react";
import axiosWithAuth from '../utils/axiosWithAuth';
import axios from 'axios'
import { createParameter } from "typescript";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);
  const [colorID, setColorId] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
    setColorId(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
            .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
            .then(res => {
             for(let i = 0; i < colors.length; i++){if(colors[i].id === res.data.id){ colors[i] = res.data}}
             updateColors(colors)
               
            }).catch(err => console.log(err));
    }

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
            .delete(`/api/colors/${color.id}`)
            .then(res => {
              console.log(res)
              updateColors(colors.filter(value => value.id != res.data))

            }).catch(err => console.log(err));
  };

  const addColor = e => {
    e.preventDefault();
    axiosWithAuth()
        .post('/api/colors', {...colorToAdd, id: Date.now()})
        .then(res => {
            updateColors(res.data)
        }).catch(err => console.log(err));

  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div/>
        <form onSubmit={addColor}>
          <legend>Add color</legend>
          <label>
            Color name:
            <input
              onChange={e =>
                setColorToAdd({ ...colorToAdd, color: e.target.value })
              }
              value={colorToAdd.color}
            />
          </label>
          <label>
            Hex code:
            <input
              onChange={e =>
                setColorToAdd({
                  ...colorToAdd,
                  code: { hex: e.target.value }
                })
              }
              value={colorToAdd.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">Add</button>
          </div>
        </form>
    </div>
  );
};

export default ColorList;
