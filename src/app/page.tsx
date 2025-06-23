import EventTable from "@/widgets/event-table/event-table";
import {EventToolbar} from "@/widgets/event-toolbar";

export default function Home() {
  return (
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
          <div className="rounded-xl border-gray-200 bg-white shadow-sm p-2" >
              <EventToolbar />
              <EventTable />
          </div>
      </div>
  );
}
