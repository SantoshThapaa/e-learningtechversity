import StudentTable from "@/components/custom/StudentTable";


export default function Page() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 pl-60">Students</h1>
            <StudentTable />
        </div>
    );
}
