import { useEffect, useState } from "react";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const alumno = JSON.parse(localStorage.getItem("alumno"));
  const studentId = alumno?.uid;

  useEffect(() => {
    if (!studentId) return;

    const fetchCourses = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/courses/${studentId}`);
        const data = await res.json();
        setCourses(data);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [studentId]);

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Mis Cursos</h2>
      {courses.map((c) => (
        <div key={c._id} className="border p-3 rounded">
          <h3 className="text-xl">{c.nombre}</h3>
        </div>
      ))}
    </div>
  );
}
