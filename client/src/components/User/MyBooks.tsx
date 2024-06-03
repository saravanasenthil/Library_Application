import { Navbar } from "../Navbar/Navbar";

const MyBooks: React.FC = () => {
  return (
    <div>
      <Navbar isUsersignIn={true} isAdmin={false} />
    </div>
  );
};

export default MyBooks;
