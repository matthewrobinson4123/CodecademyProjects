import React from "react";
import { ContactsPage } from "../../containers/contactsPage/ContactsPage";

export const ContactPicker = ({contacts, onChange}) => {
  return (
    <div>
      <label htmlFor='contacts'></label>
      <select 
        name='contacts'
        id='contacts'
        onChange={onChange}
        key={-1}
      >

        <option key='default' value='no contact selected'>
          No contact selected
        </option>
        {contacts.map( contact => {
          return (
            <option key={contact.phone} value={contact.name}>
              {contact.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};
