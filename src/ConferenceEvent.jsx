import React, { useState } from "react";
import "./ConferenceEvent.css";
import TotalCost from "./TotalCost";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from "./venueSlice";
import { incrementAvQuantity, decrementAvQuantity } from "./avSlice";

const ConferenceEvent = () => {
  const [showItems, setShowItems] = useState(false);
  const [numberOfPeople, setNumberOfPeople] = useState(1); // Esta variable no se usa en el código proporcionado
  const venueItems = useSelector((state) => state.venue);
  const avItems = useSelector((state) => state.av);
  const dispatch = useDispatch();

  // Calcula la cantidad restante del Auditorium Hall.
  // Asegúrate de que 'find' no devuelva undefined si el item no existe.
  const auditoriumItem = venueItems.find(
    (item) => item.name === "Auditorium Hall (Capacity:200)"
  );
  const remainingAuditoriumQuantity = auditoriumItem
    ? 3 - auditoriumItem.quantity
    : 3; // Si no se encuentra, asume 3 disponibles inicialmente

  const handleToggleItems = () => {
    console.log("handleToggleItems called");
    setShowItems(!showItems);
  };

  const handleAddToCart = (index) => {
    if (
      venueItems[index].name === "Auditorium Hall (Capacity:200)" &&
      venueItems[index].quantity >= 3
    ) {
      return;
    }
    dispatch(incrementQuantity(index));
  };

  const handleRemoveFromCart = (index) => {
    if (venueItems[index].quantity > 0) {
      dispatch(decrementQuantity(index));
    }
  };

  const handleIncrementAvQuantity = (index) => {
    dispatch(incrementAvQuantity(index));
    };

    const handleDecrementAvQuantity = (index) => {
    dispatch(decrementAvQuantity(index));
    };

  const handleMealSelection = (index) => {
    // Lógica para selección de comidas (si se implementa)
  };

  const getItemsFromTotalCost = () => {
    const items = [];
    // Esta función no está completa y no devuelve 'items'.
    // Si la utilizas en TotalCost, deberías implementarla.
    return items;
  };

  // Aquí 'items' será un array vacío a menos que implementes getItemsFromTotalCost
  const items = getItemsFromTotalCost();

  const ItemsDisplay = ({ items }) => {
    // Este componente no está implementado
    // Necesita lógica de renderizado para mostrar los 'items'
    return <div>Displaying items...</div>;
  };

  const calculateTotalCost = (section) => {
    let totalCost = 0;
    if (section === "venue") {
      venueItems.forEach((item) => {
        totalCost += item.cost * item.quantity;
      });
    } else if (section === "av") {
      avItems.forEach((item) => {
        totalCost += item.cost * item.quantity;
      });
    }
    return totalCost;
    };

  const venueTotalCost = calculateTotalCost("venue");
  const avTotalCost = calculateTotalCost("av");
  const navigateToProducts = (idType) => {
    // La lógica de esta función parece querer ocultar los elementos si ya están mostrándose
    // y redirigir (aunque solo cambia el estado showItems, no la vista real de la app)
    if (idType === "#venue" || idType === "#addons" || idType === "#meals") {
      if (showItems) {
        // Si showItems es true, lo cambia a false para ocultar TotalCost
        // Si quieres que siempre muestre los items al navegar, quita este if
        setShowItems(false);
      }
      // Considera añadir lógica de scroll o redirección si esto es para anclas reales.
      // document.getElementById(idType.substring(1))?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Asegúrate de que 'totalCosts' esté definido para TotalCost si no viene de props
  // O deberías pasar solo 'venueTotalCost' si es lo único que quieres mostrar.
  const totalCosts = {
    venue: venueTotalCost,
    addons: 0, // Debes calcular esto si lo usas
    meals: 0, // Debes calcular esto si lo usas
  };

  return (
    <>
      <navbar className="navbar_event_conference">
        <div className="company_logo">Conference Expense Planner</div>
        <div className="left_navbar">
          <div className="nav_links">
            <a href="#venue" onClick={() => navigateToProducts("#venue")}>
              Venue
            </a>
            <a href="#addons" onClick={() => navigateToProducts("#addons")}>
              Add-ons
            </a>
            <a href="#meals" onClick={() => navigateToProducts("#meals")}>
              Meals
            </a>
          </div>
          <button className="details_button" onClick={() => setShowItems(!showItems)}>
            Show Details
          </button>
        </div>
      </navbar>
      <div className="main_container">
        {!showItems ? (
          <div className="items-information">
            <div id="venue" className="venue_container container_main">
              <div className="text">
                <h1>Venue Room Selection</h1>
              </div>
              <div className="venue_selection">
                {venueItems.map((item, index) => (
                  <div className="venue_main" key={index}>
                    <div className="img">
                      <img src={item.img} alt={item.name} />
                    </div>
                    <div className="text">{item.name}</div>
                    <div>${item.cost}</div>
                    <div className="button_container">
                      {venueItems[index].name === "Auditorium Hall (Capacity:200)" ? (
                        <>
                          <button
                            className={
                              venueItems[index].quantity === 0
                                ? "btn-warning btn-disabled"
                                : "btn-minus btn-warning"
                            }
                            onClick={() => handleRemoveFromCart(index)}
                          >
                            &#8211;
                          </button>
                          <span className="selected_count">
                            {venueItems[index].quantity > 0
                              ? ` ${venueItems[index].quantity}`
                              : "0"}
                          </span>
                          <button
                            className={
                              remainingAuditoriumQuantity === 0
                                ? "btn-success btn-disabled"
                                : "btn-success btn-plus"
                            }
                            onClick={() => handleAddToCart(index)}
                          >
                            &#43;
                          </button>
                        </>
                      ) : (
                        <div className="button_container">
                          <button
                            className={
                              venueItems[index].quantity === 0
                                ? " btn-warning btn-disabled"
                                : "btn-warning btn-plus"
                            }
                            onClick={() => handleRemoveFromCart(index)}
                          >
                            &#8211;
                          </button>
                          <span className="selected_count">
                            {venueItems[index].quantity > 0
                              ? ` ${venueItems[index].quantity}`
                              : "0"}
                          </span>
                          <button
                            className={
                              venueItems[index].quantity === 10
                                ? " btn-success btn-disabled"
                                : "btn-success btn-plus"
                            }
                            onClick={() => handleAddToCart(index)}
                          >
                            &#43;
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="total_cost">Total Cost: ${venueTotalCost}</div>
            </div>

            {/*Necessary Add-ons*/}
            <div id="addons" className="venue_container container_main">
              <div className="text">
                <h1> Add-ons Selection</h1>
              </div>
              <div className="addons_selection"></div>

              {avItems.map((item, index) => (
                    <div className="av_data venue_main" key={index}>
                        <div className="img">
                            <img src={item.img} alt={item.name} />
                        </div>
                    <div className="text"> {item.name} </div>
                    <div> ${item.cost} </div>
                        <div className="addons_btn">
                            <button className="btn-warning" onClick={() => handleDecrementAvQuantity(index)}> &ndash; </button>
                            <span className="quantity-value">{item.quantity}</span>
                            <button className=" btn-success" onClick={() => handleIncrementAvQuantity(index)}> &#43; </button>
                        </div>
                    </div>
                ))}
              <div className="total_cost">Total Cost: {avTotalCost}</div>
            </div>

            {/* Meal Section */}
            <div id="meals" className="venue_container container_main">
              <div className="text">
                <h1>Meals Selection</h1>
              </div>
              <div className="input-container venue_selection"></div>
              <div className="meal_selection"></div>
              <div className="total_cost">Total Cost: </div>
            </div>
          </div>
        ) : (
          <div className="total_amount_detail">
            {/* Asegúrate de que 'totalCosts' y 'items' sean correctos aquí */}
            <TotalCost
              totalCosts={totalCosts}
              handleClick={handleToggleItems}
              ItemsDisplay={() => <ItemsDisplay items={items} />}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ConferenceEvent;