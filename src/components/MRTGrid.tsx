import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';

export const RoleChoices = [
  { id: "admin", label: "Admin" },
  { id: "member", label: "Member" },
];

type RoleLabel = typeof RoleChoices[number]['label'];

//example data type
type Person = {
  firstName: string;
  lastName: string;
  email: string;
  role: RoleLabel;
};

//nested data is ok, see accessorKeys in ColumnDef below
const data: Person[] = [
  {

    firstName: 'John',
    lastName: 'Doe',
    role: 'Admin',
    email: 'someemail@gmail.com',
  },
  {

    firstName: 'Jane',
    lastName: 'Doe',
    role: 'Member',
    email: 'someemail2@gmail.com',
  },
  {

    firstName: 'Joe',
    lastName: 'Doe',
    role: 'Admin',
    email: 'anotheremail@gmail.com'
  },
  {

    firstName: 'Kevin',
    lastName: 'Vandy',
    role: 'Member',
    email: 'anotheremail1@gmail.com',
  },
  {

    firstName: 'Joshua',
    lastName: 'Rolluffs',
    role: 'Admin',
    email: 'anotheremail2@gmail.com'
  },
];

const Example = () => {
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'firstName', //access nested data with dot notation
        header: 'First Name',
        size: 150,
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
        size: 150,
      },
      {
        accessorKey: 'email', //normal accessorKey
        header: 'Email',
        size: 200,
      },
      {
        accessorKey: 'role',
        header: 'Role',
        size: 150,
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });

  return <MaterialReactTable table={table} />;
};

export default Example;
