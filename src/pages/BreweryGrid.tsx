// https://api.openbrewerydb.org/v1/breweries?by_city=Richmond

import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';

import { Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { GenericResponse, getRequest } from '@services/genericApi.service';

interface Brewery {
  id: string
  name: string
  brewery_type: string,
  address_1: string,
  address_2: string,
  address_3: string,
  city: string,
  state_province: string,
  postal_code: string,
  country: string,
  phone: string,
  website_url: string,
  state: string,
  street: string,
}

function processResponse<RDType>(response: GenericResponse<RDType>): RDType {
  if (response.success) {
    return response.data;
  } else {
    const errors = response.error.errors.length ? `: ${response.error.errors.join(', ')}` : '';
    throw new Error(response.error.message + errors);
  }
}

export const getBreweries = async (): Promise<Brewery[]> => {
  const response = await getRequest<Brewery[]>("https://api.openbrewerydb.org/v1/breweries?by_city=Richmond");
  return processResponse(response);
}

const RecentPlanningAreas = () => {
  const { data: areas, isFetching } = useQuery({ queryKey: ['richmond-breweries'], queryFn: getBreweries });

  //should be memoized or stable
  if (isFetching) {
    return <p>Loading...</p>;
  }

  return (
    <Example data={areas} />
  );
};

const ActionButton = ({ row }) => {
  if (!row) {
    return null;
  }
  return (
    <Button variant="textLink" href={row.original.website_url}>View</Button>
  );
};

// const ModifiedDate = ({ cell }) => {
//   return (cell.getValue() as Date | undefined)?.toLocaleDateString();
// }

const Example = ({ data }) => {
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<Brewery>[]>(
    () => [
      {
        accessorKey: 'name', //access nested data with dot notation
        header: 'Name',
        size: 200,
      },
      {
        accessorKey: 'brewery_type', //access nested data with dot notation
        header: 'Type',
        size: 200,
      },
      {
        //with a custom Cell render the accessorKey would be used for sorting and filtering
        // FOr more complex sorting https://v2.material-react-table.com/docs/guides/sorting#sorting-functions
        accessorKey: 'address_1',
        header: 'Address',
        Cell: ({ row }) => {
          let address = row.original.address_1 ?? '';
          if (row.original.address_2) {
            address += `, ${row.original.address_2}`;
          }
          if (row.original.address_3) {
            address += `, ${row.original.address_3}`;
          }
          address += `\n${row.original.city}, ${row.original.state_province} ${row.original.postal_code}`;
          return (
            <div style={{whiteSpace: 'pre-line'}}>
              {address}
            </div>
          );
        },
      },
      // If you had a date field you could use this
      // {
      //   accessorFn: (originalRow) => new Date(originalRow.modified),
      //   id: 'modified',
      //   filterVariant: 'date-range', //use date range filter
      //   sortingFn: 'datetime', // use datetime sorting
      //   Cell: ModifiedDate, //render Date as a string
      //   header: 'Last Updated',
      //   size: 150,
      // },
      {
        accessorKey: 'none',
        header: 'Actions',
        muiTableHeadCellProps: { align: 'right' },
        muiTableBodyCellProps: { align: 'right' },
        Cell: ActionButton,
      }
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });

  return <MaterialReactTable table={table} />;
};

export default RecentPlanningAreas;
