'use client';
import {createColumnHelper} from "@tanstack/table-core";
import {
    flexRender,
} from "@tanstack/react-table";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/shared/ui/table";
import {Checkbox} from "@/shared/ui/checkbox";
import {Label} from "@/shared/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/shared/ui/select";
import {Button} from "@/shared/ui/button";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronsLeftIcon,
    ChevronsRightIcon
} from "lucide-react";
import {Badge} from "@/shared/ui/badge";

import Link from 'next/link'
import {type Event} from "@/entities/event";
import {useTable} from "@/shared/lib/hooks";
import {useEventStore} from "@/features/event-selection";

const columnHelper = createColumnHelper<Event>()
export const columns = [
    columnHelper.display({
        id: 'space',
        header: () => <span className="px"></span>,
        cell: () => <span className="px"></span>,
        enableSorting: false,
        enableHiding: false,
    }),
    columnHelper.display({
        id: 'select',
        header: ({
                     table
                 }) => (
            <div className="flex items-center ">
                <Checkbox
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"/>
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex items-center">
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    }),
    columnHelper.accessor('name', {
        cell: info => <span>{info.getValue()}</span>,
        header: () => <span>Название события</span>,
    }),
    columnHelper.accessor('status', {
        header: 'Статус',
        cell: info => <Badge variant="secondary" className="flex w-max font-bold gap-1 px-1.5 text-[var(--muted-foreground)] [&_svg]:size-3 ">
            {info.getValue()}
        </Badge>,
        sortingFn: (rowA, rowB, columnId) => {
            const order = ['Добавлено', 'Начато', 'На проверке', 'Завершено'];
            return order.indexOf(rowA.getValue(columnId)) - order.indexOf(rowB.getValue(columnId));
        }
    }),

    columnHelper.accessor('createdAt', {
        header: 'Время создания',
        cell: info => <time className="text-gray-500" dateTime={new Date(info.getValue()).toLocaleDateString()}>{new Date(info.getValue()).toLocaleDateString()}</time>,
        sortingFn: (rowA, rowB, columnId) => {
            const a = new Date(rowA.getValue(columnId)).getTime();
            const b = new Date(rowB.getValue(columnId)).getTime();
            return a - b;
        },
    }),

];

export default function EventTable() {
    const data = useEventStore((store) => store.events);
    const table = useTable<Event>({columns, data: data ?? []})
    return (
        <div>
            <Table>
                <TableHeader className="sticky top-0 z-10 bg-[var(--muted)]">
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map(header => {
                                const isSorted = header.column.getIsSorted();
                                return (
                                    <TableHead key={header.id} colSpan={header.colSpan}
                                               onClick={header.column.getToggleSortingHandler()}>
                                        {header.isPlaceholder
                                            ? null
                                            : (
                                                <div className="flex items-center gap-1">
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                    {isSorted === 'asc' && ' 🔼'}
                                                    {isSorted === 'desc' && ' 🔽'}
                                                </div>
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody className="**:data-[slot=table-cell]:first:w-8">
                    {table.getRowModel().rows?.length ? table.getRowModel().rows.map(row => (
                        <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="relative z-0 group">
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className=" py-4 px-2">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </TableRow>
                    )) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className="flex items-center justify-between px-4">
                <div className="hidden flex-1 text-sm text-[var(--muted-foreground)] lg:flex">
                    {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
                    selected.
                </div>
                <div className="flex w-full items-center gap-8 lg:w-fit">
                    <div className="hidden items-center gap-2 lg:flex">
                        <Label htmlFor="rows-per-page" className="text-sm font-medium">
                            Rows per page
                        </Label>
                        <Select
                            value={`${table.getState().pagination.pageSize}`}
                            onValueChange={(value) => {
                                table.setPageSize(Number(value))
                            }}
                        >
                            <SelectTrigger className="w-20" id="rows-per-page">
                                <SelectValue placeholder={table.getState().pagination.pageSize} />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {[10, 20, 30, 40, 50].map((pageSize) => (
                                    <SelectItem key={pageSize} value={`${pageSize}`}>
                                        {pageSize}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex w-fit items-center justify-center text-sm font-medium">
                        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </div>
                    <div className="ml-auto flex items-center gap-2 lg:ml-0">
                        <Button
                            variant="outline"
                            className="hidden h-8 w-8 p-0 lg:flex"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <span className="sr-only">Go to first page</span>
                            <ChevronsLeftIcon />
                        </Button>
                        <Button
                            variant="outline"
                            className="size-8"
                            size="icon"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <span className="sr-only">Go to previous page</span>
                            <ChevronLeftIcon />
                        </Button>
                        <Button
                            variant="outline"
                            className="size-8"
                            size="icon"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <span className="sr-only">Go to next page</span>
                            <ChevronRightIcon />
                        </Button>
                        <Button
                            variant="outline"
                            className="hidden size-8 lg:flex"
                            size="icon"
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                        >
                            <span className="sr-only">Go to last page</span>
                            <ChevronsRightIcon />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
