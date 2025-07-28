import sqlite3

conn = sqlite3.connect('students.db')
c = conn.cursor()

# حذف الجدول القديم إن وُجد
c.execute("""
DROP TABLE IF EXISTS students
""")

# إنشاء الجدول الجديد مع عمود الصورة
c.execute("""
CREATE TABLE students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    registration_number TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    field TEXT NOT NULL,
    year TEXT NOT NULL,
    place TEXT NOT NULL,
    birthdate TEXT NOT NULL,
    photo_url TEXT NOT NULL             -- ✅ العمود الجديد
)
""")

# بيانات الطلاب مع رابط الصورة
students = [
    ('2023001', '1234', 'أحمد بن صالح', 'علوم الحاسوب', 'السنة الأولى', 'الوادي', '2001-02-15', 'images/ahmed.jpg'),
    ('2023002', 'abcd', 'ليلى محمد', 'الرياضيات', 'السنة الثانية', 'قسنطينة', '2000-11-05', 'images/layla.jpg'),
    ('2023003', 'xyz1', 'كريم علي', 'الفيزياء', 'السنة الثالثة', 'عنابة', '1999-07-30', 'images/karim.jpg')
]

c.executemany('''
INSERT INTO students 
(registration_number, password, name, field, year, place, birthdate, photo_url) 
VALUES (?, ?, ?, ?, ?, ?, ?, ?)
''', students)

conn.commit()
conn.close()
print("✅ قاعدة البيانات أنشئت وأضيفت البيانات بنجاح")
