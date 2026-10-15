'use client'
import { useFormStatus } from 'react-dom';

// Delete button that asks for confirmation before the form is submitted.
const DeleteButton = ({ className, label }) => {
   const { pending } = useFormStatus();

   const confirmDelete = (e) => {
      if (!window.confirm(`Delete ${label}? This can't be undone.`)) e.preventDefault();
   };

   return (
      <button className={className} disabled={pending} onClick={confirmDelete}>
         {pending ? 'Deleting...' : 'Delete'}
      </button>
   );
};

export default DeleteButton;
