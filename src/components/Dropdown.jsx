
const Dropdown = () => {
  return (
    <div>
        <select id="countries" className="w-full p-2 border-emerald-600 border rounded focus:outline-none">
        <option selected>Mode Of Travel</option>
        <option value="Bike">Bike</option>
        <option value="Bus">Bus</option>
        <option value="Scooty">Scooty</option>
        <option value="Auto">Auto</option>
    </select>
    </div>
  )
}

export default Dropdown